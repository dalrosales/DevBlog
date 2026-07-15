---
title: "Deploying My Astro Blog with Azure Static Web Apps and GitHub Actions"
published: 2026-07-15
draft: false
tags: ["Azure", "CI/CD", "GitHub Actions", "Astro", "DevOps", "Static Web Apps"]
toc: true
---

This blog is built with [Astro](https://astro.build) and deployed automatically to [Azure Static Web Apps](https://azure.microsoft.com/en-us/products/app-service/static) every time I push to the `main` branch on [GitHub](https://github.com/dalrosales/DevBlog/tree/main). Eliminating the need to upload manually or log into Azure to deploy. I push a commit, and within a couple of minutes the site is live!

In this post I want to walk through how that pipeline works, what each piece is doing, and a few things I ran into that are worth knowing about".

---

## What Is CI/CD?

CI/CD stands for Continuous Integration and Continuous Deployment. The terms sound heavy but the idea is straightforward.

**Continuous Integration** means every time you push code, an automated process runs to validate it. For a compiled application that might mean running tests or building a binary. For a static site like this one, it means running `npm run build` and making sure the output is valid.

**Continuous Deployment** means that if the build succeeds, the result gets pushed to production automatically with no manual steps in between.

Together they form a pipeline: code goes in one end and a live deployment comes out the other. The practical benefit is that deploying doesn't become a whole event. It's just something that happens when you push!

---

## The Stack

- **Blog framework:** Astro (outputs a static `/dist` folder of HTML, CSS, and JS)
- **Source control:** GitHub
- **CI/CD runner:** GitHub Actions
- **Hosting:** Azure Static Web Apps (free tier)

Azure Static Web Apps is Microsoft's hosting platform for static sites and front-end frameworks. It handles global CDN distribution, free SSL certificates, and custom domain support. The free tier is generous enough for a personal blog with no practical limits on bandwidth or requests.

GitHub Actions is the automation layer. It listens for events in your repository (like a push to `main`) and runs a defined workflow in response. That workflow is just a YAML file that lives in your repo under `.github/workflows/`.

---

## How the Pipeline Works

Here's the workflow file that powers this blog's deployment:

```yaml
name: Azure Static Web Apps CI/CD

on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, synchronize, reopened, closed]
    branches:
      - main

jobs:
  build_and_deploy_job:
    if: github.event_name == 'push' || (github.event_name == 'pull_request' && github.event.action != 'closed')
    runs-on: ubuntu-latest
    name: Build and Deploy Job
    permissions:
      id-token: write
      contents: read
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: false
          lfs: false

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install OIDC Client from Core Package
        run: npm install @actions/core@1.6.0 @actions/http-client

      - name: Get Id Token
        uses: actions/github-script@v6
        id: idtoken
        with:
          script: |
            const coredemo = require('@actions/core')
            return await coredemo.getIDToken()
          result-encoding: string

      - name: Build And Deploy
        id: builddeploy
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          action: "upload"
          app_location: "/"
          api_location: ""
          output_location: "/dist"
          github_id_token: ${{ steps.idtoken.outputs.result }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}

  close_pull_request_job:
    if: github.event_name == 'pull_request' && github.event.action == 'closed'
    runs-on: ubuntu-latest
    name: Close Pull Request Job
    steps:
      - name: Close Pull Request
        id: closepullrequest
        uses: Azure/static-web-apps-deploy@v1
        with:
          action: "close"
```

Let's walk through what each section is doing.

### Triggers (`on`)

```yaml
on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, synchronize, reopened, closed]
    branches:
      - main
```

This defines what events cause the workflow to run. Two things trigger it: a push directly to `main`, or any pull request (PR) activity targeting `main`. The PR trigger is useful if you ever want to preview changes before merging as Azure Static Web Apps can spin up a staging environment per pull request automatically.

### The Build and Deploy Job

```yaml
if: github.event_name == 'push' || (github.event_name == 'pull_request' && github.event.action != 'closed')
runs-on: ubuntu-latest
```

The `if` condition makes sure this job only runs on pushes and open PRs, not when a PR is closed (that case is handled by the second job). 

With `runs-on: ubuntu-latest`, GitHub spins up a fresh Ubuntu virtual machine (VM) for each run. You're not managing this server as GitHub provides and tears it down automatically.

### Steps

**Checkout**
```yaml
- uses: actions/checkout@v4
```
Pulls your repository code onto the runner. Without this the VM has no idea what your project looks like.

**Setup Node**
```yaml
- uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'npm'
```
Installs Node.js 20 and caches your `npm` dependencies between runs. The cache means subsequent deploys are faster since packages don't need to be re-downloaded every time.

**OIDC Authentication**
```yaml
- name: Install OIDC Client from Core Package
  run: npm install @actions/core@1.6.0 @actions/http-client

- name: Get Id Token
  uses: actions/github-script@v6
  id: idtoken
  ...
```
This part is specific to Azure. OIDC stands for OpenID Connect and is a modern way for GitHub Actions to authenticate with Azure without storing a long-lived password or token. Instead, GitHub generates a short-lived identity token that Azure can verify and trust. The `id-token: write` permission declared earlier in the job is what allows this.

**Build and Deploy**
```yaml
- name: Build And Deploy
  uses: Azure/static-web-apps-deploy@v1
  with:
    azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
    action: "upload"
    app_location: "/"
    output_location: "/dist"
```
This is where the actual work happens. The `Azure/static-web-apps-deploy` action builds the Astro project and uploads the output to Azure. A few things worth noting:

- `app_location: "/"` tells the action where your source code lives (the repo root).
- `output_location: "/dist"` tells it where Astro puts the built output. Astro compiles everything into a `dist/` folder. This is what actually gets deployed, not the source files.
- `secrets.AZURE_STATIC_WEB_APPS_API_TOKEN` is the deployment token, stored as a GitHub secret so it's never visible in the workflow file. More on this below.

### The Close PR Job

```yaml
close_pull_request_job:
  if: github.event_name == 'pull_request' && github.event.action == 'closed'
```

When a pull request targeting `main` is closed, this job runs and tears down any staging environment Azure created for that PR. It keeps things tidy and avoids orphaned preview deployments piling up.

---

## The Deployment Token

The `AZURE_STATIC_WEB_APPS_API_TOKEN` secret is what authorizes GitHub Actions to push to your Azure Static Web App. You can find it in the Azure Portal under your Static Web App resource, then **Overview > Manage deployment token**.

Once you have it, add it to your GitHub repository under **Settings > Secrets and variables > Actions > New repository secret**.

This token is long-lived, which means it's worth knowing: if Azure ever rotates it (or you regenerate it manually), you need to update the secret in GitHub as well. A mismatch between the two is one of the most common reasons a previously working pipeline suddenly fails with an "Invalid API key" error.

---

## The Result

Every time I push to `main`, whether it's a new blog post or a config tweak, GitHub Actions kicks off within seconds. The runner checks out the code, builds the Astro site, and uploads the output to Azure. The whole process takes about two minutes.

It means publishing a new post is just:

```bash
git add .
git commit -m "add new post"
git push
```

That's it. The pipeline handles the rest!

---

## Lessons Learned

- **The deployment token is easy to forget about.** It's not the kind of thing you think about until the pipeline suddenly fails. Worth noting where it lives in the Azure Portal so you can rotate it quickly when needed.
- **`output_location` has to match your framework's build output.** Astro uses `dist/` by default. If you ever change this in your `astro.config.mjs`, the workflow needs to match.
- **GitHub Actions logs are your friend.** When something breaks, the logs in the Actions tab give you the exact error and line number. The failure that prompted me to double-check the token setup was caught in under a minute just by reading the output.

---

*This blog is an ongoing project. The source is on [GitHub](https://github.com/dalrosales) if you want to see how it's structured.*

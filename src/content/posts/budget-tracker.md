---
title: 'BudgetTracker – Personal Finance Web App'
published: 2025-08-08
draft: false
tags: ['ASP.NET Core', '.NET 8', 'Razor Pages', 'RESTful API', 'Azure', 'TailwindCSS', 'Flowbite', 'Budgeting', 'Project']
toc: true
---

## Overview

**BudgetTracker** is a personal finance web application I’m building to help users create budgets, track income, manage expenses, and set financial goals. The design focuses on simplicity and flexibility — breaking down spending into categories, tracking progress visually, and keeping financial goals within reach.

This project also serves as a learning ground for applying my skills in **ASP.NET Core Razor Pages**, **RESTful API design**, **TailwindCSS**, and **Azure cloud hosting**, while exploring best practices for secure, scalable web applications.

::github{repo="dalrosales/BudgetTracker"}

:::note
**Under Active Development**: This project is still in the early stages. The application architecture is being built, the API is in progress, and the front end requires significant work before any features are production-ready.

This post will be **actively updated** as development continues. The repository is public for demonstration purposes, but the codebase is not intended for reuse or redistribution.
:::

---

## Why I’m Building It

I wanted a budgeting tool that’s tailored to how I think about money. Tracking both the big picture and the finer details, while keeping the interface clean and intuitive. Existing tools were either too cluttered, locked behind paywalls, or harvest sensitive data. By building my own, I can:

- Control the data and hosting environment
- Experiment with architectural patterns like **service and data layers**
- Practice deploying to **Azure** with security best practices in mind
- And replace my Excel sheets!

---

## Planned Features

- **Customizable budget creation**: define budgets and categories that fit different financial needs.
- **Expense tracking by category**: log transactions and see exactly where money is going.
- **Income tracking**: record and manage multiple income sources.
- **Goal setting**: track progress toward savings or debt-reduction targets.
- **Visual insights**: view charts, summaries, and dashboards for quick financial overviews.

---

## Under the Hood

### Frontend 🖥️ 
- **ASP.NET Core Razor Pages** (`.NET 8`)
- **Flowbite** + **TailwindCSS** for fast, responsive UI components
- **HTML5**, **CSS3**, **JavaScript**

### Backend ⚙️ 
- **ASP.NET Core Web API** (`.NET 8`)
- RESTful architecture  
- Service and data layers to separate concerns
- **Azure SQL Database** for persistent storage

### Hosting ☁️ 
- Deployed on **Microsoft Azure** (frontend, API, and database)  
- Secrets stored securely using **Azure Key Vault** and **App Configuration**

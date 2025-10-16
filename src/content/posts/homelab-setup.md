---
title: "My Homelab Setup using Arch Linux"
published: 2025-10-22
draft: false
tags: ["Homelab", "Arch Linux", "Docker", "Self-Hosting", "Vaultwarden", "Jellyfin", "Immich", "Portainer", "NGINX"]
toc: true
---

## Why I Built a Homelab

I’ve always been curious about self-hosting and learning how to work Linux and Docker. Setting up a homelab has given me a playground for experimenting with **Linux administration, containerization, networking, and DevOps practices**, but on hardware I control!  

My main goals:
- Gain some hands-on experience with technologies I had yet to work with  
- Host useful apps for myself (media center, password manager, photo storage + backup)  
- Learn how to configure, secure, monitor, and maintain containerized services

---

## Hardware & OS

- **My host machine:**
    - CPU: Ryzen 5 3600 (6 core) @  4.10~ GHz
    - CPU Cooler: Cooler Master MA610P
    - Motherboard: Asus ROG Strix B450-F
    - RAM: Crucial Ballistix 16 GB RAM (2 x 8 GB)
    - GPU: MSI Mech 2X OC Radeon RX 6700 XT (12 GB)
    - Storage: 1 x WD Black SN750 500 GB NVMe SSD
    - Storage: 1 x Samsung 980 2 TB NVMe SSD
    - PSU: Asus ROG Strix 750 W 80+ Gold 
- **OS:** Windows 11 / Arch Linux dualboot using GRUB
- **Containerization:** Docker + Docker Compose
- **Future Upgrades**
    - Looking to add several Seagate Ironwolf NAS HDDs
    - Building a separate machhine to run full-time as a server; Proxmox seems like a good solution.
---

## Core Services I Set Up

### 🎬 Jellyfin
Media server for movies/TV/music.  
- **Why:** I was most exited for this application as I wanted to stream my media collection at home and remotely.  
- **Setup notes:** Configured hardware transcoding via GPU passthrough to play a variety of codecs.  
- **Challenge:** Audio transcoding quirks with Apple TV app (eventually solved via Infuse).

### 🖼️ Immich
A photo and video backup/management app.
- **Why:** Replace reliance on iCloud/Google Photos with local storage.
- **Setup notes:** Pointed storage at a seperate mounted media drive. The built-in local machine learning is excellent!
- **Challenge:** Initial DB migrations took some troubleshooting, but the UI is very fluid.  

### 🔑 Vaultwarden
A lightweight, self-hosted version of Bitwarden.  
- **Why:** I wanted a private, secure password manager.  
- **Setup notes:** My initial application I set up using a simple Docker Compose stack, used persistent volumes for data.  
- **Challenge:** Getting HTTPS set up correctly through Nginx reverse proxy.  

### 🌐 Nginx Reverse Proxy
Fronts all my services with HTTPS and friendly URLs.  
- **Why:** Simplify access to services with my domain and enforce SSL everywhere.  
- **Setup notes:** Used `nginx-proxy` with Let’s Encrypt companion for automatic certs.  
- **Challenge:** DNS setup + making sure Cloudflare was passing through correctly.  

### ⚓ Portainer
A web-based Docker management UI.
- **Why:** Makes managing containers easier than always working at the CLI.  
- **Setup notes:** Installed directly with Docker run command.  
- **Challenge:** Have yet to get much exposure since I set up my contiainers via CLI, but I plan to learn more on this!

### 🛜 TailScale
A simple VPN service for secure remote access to my homelab.
- **Why:** TailScale makes connecting to my services from anywhere easy, without the 
hassle of port forwarding or complex network setups.
- **Setup notes:** Installed on my host machine and other devices (iOS, Windows laptop), allowing an encrypted connection
- **Challenge:** Ensuring proper firewall rules and routing for selective VPN access.
---

## Lessons Learned

- **Start small:** Running 1–2 containers at a time and verifying each worked saved me from debugging a giant stack at once.
I first started by running Vaultwarden and accessing it via my local network.
- **Reverse proxy is key:** Nginx (or alternatively Traefik) makes self-hosting dramatically easier. After setting up Vaultwarden, I
consigured the reverse proxy to simplify access, avoiding remembering port numbers.
- **Arch as a server OS:** More maintenance than other distros, but great for learning how packages and services actually work. I'm slowly getting familiar with Linux quirks as a life-long Windows user. Getting to love how much control I have over the most minute things!

---

## Next Steps

- Get more familiar with Portainer, as it could help manage and maintain my stacks a bit easier.
- Automate deployments with Docker Compose files in GitHub. I'd like to have all my services easily transferrable once I build a dedicated server.
- Explore backups. Proxmox seems like a good solution for my future build, so I'd like to explore backup options and RAID optimal configurations for redudancy.
- I plan to do a write up of my services and how I configured them. More to come!
---

*This post is part of my ongoing homelab journey. More to come as I add new services and refine my setup.*

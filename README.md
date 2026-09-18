# AuraDesk Website

Premium landing page and interactive product demo for **AuraDesk**, a privacy-first, on-device desktop AI companion for Snapdragon-powered PCs.

## Local development

```bash
pnpm install
pnpm dev
```

The site is a static React + Vite frontend. The main experience lives in `client/src/pages/Home.tsx`, with the visual system in `client/src/index.css`.

## Product story

AuraDesk sees, hears, and helps without sending the core context loop to the cloud. The website demonstrates:

- Permissioned screen understanding
- Private meeting transcription
- Local reasoning on Snapdragon NPU hardware
- Redaction and bounded session memory
- One-click context wipe

## Build

```bash
pnpm build
```

The GitHub repository contains the website implementation. The original AuraDesk Python prototype can be kept as a separate project or added under a dedicated directory if needed.

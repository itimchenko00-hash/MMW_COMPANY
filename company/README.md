# MMW-COMPANY — Canonical Company Package

## Purpose
This directory contains only the current, actively used company-level materials of MMW-COMPANY.

## Rule
The package is intentionally minimal. Superseded versions, drafts, experiments, previews and duplicate materials are not copied here.

## Current company website package
The `website/` directory contains the production company pages currently used by the live MMW-COMPANY site:

- home-v9.html — current homepage
- about-v1.html — company
- services-v1.html — services
- products-v2.html — product architecture
- projects-v4.html — project portfolio
- investment-v1.html — investment logic
- team-v1.html — team & careers
- contact-v1.html — contact / intake
- mmw-site.css — shared production stylesheet

## Separation principle
MMW-COMPANY is the development center and project factory. Its projects remain independent under `projects/`. Their economics, documentation and operating logic are not merged into the company package.

## Technical source of truth
The live application/runtime remains in the repository root and `src/`. This package does not replace or modify the production runtime.

## Frozen boundaries
- Do not mix project materials into company materials.
- Do not copy obsolete drafts merely because they exist in the repository.
- Do not modify MMW-ORDER.
- Do not change live routes as part of packaging.

Status: canonical company package · 2026-09-02

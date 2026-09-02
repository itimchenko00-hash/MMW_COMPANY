# MMW-COMPANY deployment map

## Canonical production repository
- Repository: `itimchenko00-hash/MMW_COMPANY`
- Branch: `main`
- Runtime: Node.js / Express
- Start command: `npm start`
- Entry point: `src/server.js`
- Homepage source: `public/home-v10.html`
- Portfolio source: `public/projects-v5.html`
- Health endpoint: `/health`
- Version endpoint: `/__mmw-version`

## Project master routes
- `/aladin-v2`
- `/nexus`
- `/nexus-logistics`
- `/carpathia-master`
- `/carpathia-feasibility`
- `/agrohub`
- `/energy`
- `/energy-master`
- `/projects`

MMW-ORDER is a separate application and must not be modified by changes in this repository.

## Important: duplicate legacy repository
`itimchenko00-hash/mmw-company` is a separate legacy repository and is not the canonical source for the current MMW-COMPANY website.

## Verification
After a Render deploy, opening `/__mmw-version` must return:
`2026-09-02-mmw-master-v10`

The response must also identify repository `itimchenko00-hash/MMW_COMPANY` and branch `main`.

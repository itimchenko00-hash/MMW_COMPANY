# MMW-COMPANY deployment map

## Canonical production repository
- Repository: `itimchenko00-hash/MMW_COMPANY`
- Branch: `main`
- Runtime: Node.js / Express
- Start command: `npm start`
- Entry point: `src/server.js`
- Homepage source: `public/home-v6.html`
- Health endpoint: `/health`
- Version endpoint: `/__mmw-version`

## Production application contract
The canonical MMW-COMPANY application serves the homepage from `public/home-v6.html` and preserves the project routes:
- `/aladin`
- `/nexus`
- `/carpathia`
- `/agrohub`
- `/energy`
- `/projects`

MMW-ORDER is a separate application and must not be modified by changes in this repository.

## Important: duplicate legacy repository
`itimchenko00-hash/mmw-company` is a separate private legacy repository with its own Node/Express application and its own history. It is not the canonical source for the current MMW-COMPANY website.

Do not deploy the legacy repository as the production MMW-COMPANY homepage.

## Verification
After a Render deploy, opening `/__mmw-version` must return:
`2026-09-01-home-v6-canonical`

The response must also identify repository `itimchenko00-hash/MMW_COMPANY` and branch `main`.

# FACTORY PUBLISHING ARCHITECTURE

## One repository, one GitHub Pages site

GitHub Pages provides one Pages site per repository. Therefore the Factory uses one isolated portfolio publication site with project subpaths, rather than letting multiple project workflows overwrite the same Pages deployment.

Published structure:
- `/ALADIN/`
- `/NEXUS-WORK/`
- `/NEXUS-LOGISTICS/`
- `/CARPATHIA/`
- `/AGROHUB/`
- `/ENERGY-PARK/`
- `/MMW-COMPANY/`

Only `WORKSPACE/<PROJECT>/RELEASE/**` is eligible for publication.

## Safety
- DEV and TEST are never published.
- STAGE is never published automatically.
- READY becomes RELEASE only through the controlled promotion workflow.
- Previous RELEASE content is archived before replacement.
- Publication is read-only with respect to project source.
- The Factory publisher cannot push to `main` or frozen branches.

## One-time GitHub setting
Repository Settings → Pages → Source → GitHub Actions must be enabled. GitHub documents this as a prerequisite for custom Pages workflows.

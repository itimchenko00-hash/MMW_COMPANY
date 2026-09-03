# RELEASE POLICY

1. DEV is the only place where active edits are allowed.
2. TEST must pass before STAGE is accepted.
3. STAGE is the human verification environment.
4. READY is frozen until release approval.
5. RELEASE is copied from READY and must not be edited in place.
6. Publication reads RELEASE only.
7. Publication never writes back into project source folders.
8. Each project owns its own pipeline and cannot trigger another project's deployment.
9. Failed checks stop the pipeline.
10. Rollback means selecting a previous RELEASE; never repair a live release in place.

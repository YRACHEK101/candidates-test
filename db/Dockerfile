FROM postgres:16-alpine

# The schema and seed data are NOT created here.
# The server container runs the Sequelize migrations and seeders on startup.
HEALTHCHECK --interval=5s --timeout=5s --retries=10 \
  CMD pg_isready -U "$POSTGRES_USER" -d "$POSTGRES_DB" || exit 1

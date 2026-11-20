#!/bin/sh
set -e

echo "Running database migrations..."
npx sequelize-cli db:migrate

echo "Running database seeders (only new ones are executed)..."
npx sequelize-cli db:seed:all

echo "Starting the API..."
exec npm run dev

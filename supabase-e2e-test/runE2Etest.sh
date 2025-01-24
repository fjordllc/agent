#!/bin/bash

# Exit on error
set -e

# Check if Supabase repo already exists
if [ -d "supabase" ]; then
    echo "Supabase repository already cloned. Skipping cloning step."
    cd supabase/docker
else
    # Get the code
    echo "Cloning Supabase repository..."
    git clone --depth 1 https://github.com/supabase/supabase
    cd supabase/docker

    # Copy the fake env vars
    echo "Copying environment variables..."
    cp .env.example .env

    # Pull the latest images
    echo "Pulling the latest Docker images..."
    docker compose pull
fi

# Start the services (in detached mode)
echo "Starting services..."
docker compose up -d

echo "Services are up and running!"

echo "Applying migrations..."
MIGRATION_DIR="../../migrations"
for file in "$MIGRATION_DIR"/*.sql; do
    echo "Applying migration: $file"
    docker cp "$file" supabase-db:/tmp/$(basename "$file")
    docker compose exec db psql -U postgres -d postgres -f /tmp/$(basename "$file")
done

echo "Migrations applied successfully!"

# Seed the database
echo "Seeding the database..."
docker cp ../../seed.test.sql supabase-db:/tmp/seed.test.sql
echo "Seeding the database..."
docker compose exec db psql -U postgres -d postgres -f /tmp/seed.test.sql

echo "Database seeding completed!"

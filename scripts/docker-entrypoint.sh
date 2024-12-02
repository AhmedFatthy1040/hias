#!/bin/sh
set -e

# Wait for database to be ready
echo "Waiting for PostgreSQL to be ready..."
sleep 5

# Run Prisma migrations
echo "Running Prisma migrations..."
cd /app && npx prisma migrate dev

# Execute the command passed to docker-compose
echo "Starting the application..."
exec "$@"

# Challenge-de-Back-End-Puul

This repository contains a NestJS application connected to a PostgreSQL database using Prisma ORM.

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (v7 or higher)
- [PostgreSQL](https://www.postgresql.org/) or a PostgreSQL database service (like Supabase)
- [Docker](https://www.docker.com/) (optional, for containerized deployment)

### Clone the repository


### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file in the root directory:

```
DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"
```


### Generate Prisma client and run migrations

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### Start the application

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## 🐳 Docker Deployment

### Build and run with Docker Compose

```bash
docker-compose up -d
```

### Run migrations in the container (if needed)

```bash
docker-compose exec api npx prisma migrate deploy
```

Change the `DATABASE_URL` in the docker-compose too.Im using a local database.



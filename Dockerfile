# Base Node image
FROM node:18-alpine AS builder

# Create app directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy prisma schema
COPY prisma ./prisma/

# Generate Prisma client
RUN npx prisma generate

# Copy app source
COPY . .

# Build the application
RUN npm run build

# Production image
FROM node:18-alpine AS production

# Set NODE_ENV
ENV NODE_ENV=production

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy Prisma client and migrations
COPY --from=builder /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=builder /app/prisma /app/prisma

# Copy built application
COPY --from=builder /app/dist /app/dist

# Expose the application port
EXPOSE 3000

# Start the application with database migration
CMD ["/bin/sh", "-c", "npx prisma migrate deploy && node dist/main"]
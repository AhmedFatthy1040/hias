# Development stage only
FROM node:20-slim

# Install OpenSSL
RUN apt-get update -y && \
    apt-get install -y openssl && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY ./app/package*.json ./app/

# Install dependencies
RUN npm install && \
    cd ./app && npm install

# Create a script to handle startup
COPY ./scripts/docker-entrypoint-app.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]

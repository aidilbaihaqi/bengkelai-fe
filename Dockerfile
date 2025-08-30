FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Remove devDependencies after build
RUN npm ci --only=production && npm cache clean --force

EXPOSE 3000

CMD ["npm", "start"]
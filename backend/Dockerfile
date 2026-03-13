
FROM node:20-alpine AS base

WORKDIR /usr/src/app

# Install only prod deps
COPY package.json ./
RUN npm install --omit=dev

# Copy source
COPY src ./src

# Create non-root user
RUN addgroup -S app && adduser -S app -G app      && mkdir -p /usr/src/app      && chown -R app:app /usr/src/app

USER app
EXPOSE 3000
CMD ["node", "src/index.js"]

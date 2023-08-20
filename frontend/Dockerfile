# Set the base image to node 18 alpine
FROM node:18-alpine AS preps

RUN apk update
RUN apk upgrade

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

# Set the working directory
WORKDIR /home/node/assignment-nuxt3

# Install pnpm globally
RUN npm install -g pnpm

# Copy the source code to the container
COPY . ./

RUN pnpm install

FROM node:18-alpine AS deps

WORKDIR /home/node/assignment-nuxt3

# Install pnpm globally
RUN npm install -g pnpm

# pnpm fetch only requires lockfile
COPY --from=preps /home/node/assignment-nuxt3/pnpm-lock.yaml ./

# Install dependencies using pnpm in --prod mode
RUN pnpm fetch --prod

# Create a new stage for building the application
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /home/node/assignment-nuxt3

# Install pnpm globally
RUN npm install -g pnpm

# Copy the source code to the container
COPY . ./

# Copy the node_modules from the preparation stage
COPY --from=preps /home/node/assignment-nuxt3/.nuxt ./.nuxt
COPY --from=preps /home/node/assignment-nuxt3/node_modules ./node_modules

# Build the application using pnpm
RUN pnpm build

# Create a new stage for running the application
FROM node:18-alpine AS runner

# Set the working directory
WORKDIR /home/node/assignment-nuxt3

# Set environment variables
ENV NODE_ENV production

# Install pnpm globally
RUN npm install -g pnpm

# Copy the built files and nuxt config from the previous stage
COPY --from=builder /home/node/assignment-nuxt3/.nuxt ./.nuxt/
COPY --from=builder /home/node/assignment-nuxt3/.output ./.output/
COPY --from=builder /home/node/assignment-nuxt3/nuxt.config.ts ./

COPY --from=deps /home/node/assignment-nuxt3/pnpm-lock.yaml ./

# Fetch production packages to virtual store
RUN pnpm fetch --prod

# Set the ownership of the directory to the "node" user
RUN chown -R node /home/node/assignment-nuxt3

# Set the user to the "node" user
USER node

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["node", ".output/server/index.mjs"]

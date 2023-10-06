# Stage 1: Build the Next.js app
FROM node:18 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app source code to the container
COPY . .

# Build the Next.js app
RUN npm run build


# Stage 2: Serve the app using a lightweight production image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the built app from the previous stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose the port on which your Next.js app will run (change this to your app's port)
EXPOSE 3000

# Start the Next.js app in production mode
CMD ["npm", "start"]
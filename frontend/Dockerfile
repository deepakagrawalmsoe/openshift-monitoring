# Stage 1: Build React app
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package files separately for better caching
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source files and build the React app
COPY . .  
RUN npm run build

# Stage 2: Use Nginx to serve the React app
FROM nginx:alpine

# Copy the built app from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

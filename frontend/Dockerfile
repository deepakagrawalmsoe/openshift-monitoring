# Use an official Node.js image to build the React app
FROM node:18 as build

WORKDIR /app

# Copy package.json and package-lock.json, then install dependencies
COPY package.json /app/
RUN npm install

# Copy the source files and build the app
COPY . /app/
RUN npm run build

# Use a lightweight Nginx image to serve the React app
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

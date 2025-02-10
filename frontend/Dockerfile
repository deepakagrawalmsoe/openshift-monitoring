# Use Node.js base image from OpenShift
FROM image-registry.openshift-image-registry.svc:5000/openshift/nodejs:18-ubi8

# Set working directory inside the container
WORKDIR /app

# Ensure non-root user can access the directory
RUN mkdir -p /app && chown -R 1001:0 /app
USER 1001

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package.json package-lock.json /app/

# Install dependencies
RUN npm install --no-optional --no-audit --no-fund

# Copy the rest of the application code
COPY . /app

# Expose the port the app runs on
EXPOSE 3000

# Command to start the application
CMD ["npm", "start"]

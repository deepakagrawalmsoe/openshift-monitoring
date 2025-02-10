FROM image-registry.openshift-image-registry.svc:5000/openshift/nodejs:18-ubi8

WORKDIR /app

# Ensure proper permissions
RUN mkdir -p /app && chown -R 1001:0 /app && chmod -R 777 /app

USER 1001

# Set HOME for npm
ENV HOME=/app

# Copy package files first (for better caching)
COPY package.json /app/

# Ensure npm cache is writable (without --global)
RUN npm config set cache /tmp/npm-cache

# Install dependencies with necessary flags
#RUN npm install --no-optional --no-audit --no-fund --unsafe-perm=true
RUN npm config set registry https://registry.npmjs.org/ && npm install --no-optional --no-audit --no-fund --unsafe-perm=true


# Copy the rest of the app files
COPY . /app

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]

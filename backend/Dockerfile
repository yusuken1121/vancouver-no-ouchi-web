# Use the official Node.js image as the base image
FROM node:22.4.0

# Set the working directory in the container
WORKDIR /src

# Copy the application files into the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application files into the working directory
COPY . .

# Build the TypeScript code to generate the dist folder
RUN npm run build

# Expose the port the app runs on (replace 3000 with your app's port if different)
EXPOSE 3000

# Define the entry point for the container
CMD ["npm", "run", "start"]
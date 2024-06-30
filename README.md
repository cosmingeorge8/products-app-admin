# Products App Frontend

## Overview
The front-end of the `products-app` is a React-based admin interface for managing a list of products, each with a name, price, image, and stock. The admin front-end utilizes Bootstrap for styling and establishes a real-time socket.io connection to the backend to instantly reflect changes made from other clients.

## Prerequisites
- Docker
- Docker Compose
- A running instance of the backend services (API, MongoDB, Redis, NGINX)

## Project Structure
- `web`: The React front-end application.

## Environment Variables
The front-end service can be configured using environment variables. By default, `BASE_URL` is set to `localhost` but can be overridden as needed.

## Docker Configuration

### Dockerfile

Here's the Dockerfile for the React front-end:

```Dockerfile
# Use the official Node.js image as the base image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React application
RUN npm run build

# Install serve to serve the build
RUN npm install -g serve

# Set the environment variable to be used in the application
ENV NODE_ENV=production

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["serve", "-s", "build", "-l", "3000"]
```
## Running the Application
1. Build and start all the services using Docker Compose:
   ```bash
   docker-compose up --build
   ```

2. The front-end application should now be accessible at `http://localhost:3000`.

## Real-time Updates with Socket.io
The front-end establishes a socket.io connection to the backend. When a product is updated on one computer, the changes are instantly reflected on other computers.

## License
This project is licensed under the MIT License.

---


# Stage 1: Build the Angular app
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the Angular project files
COPY . .

# Build the Angular app with production configuration
RUN npm run build -- --configuration production

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy the custom nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Remove the default Nginx HTML directory
#RUN #rm -rf /usr/share/nginx/html/*

# Copy the built Angular files from Stage 1
COPY --from=build /app/dist/angular-ui-app /usr/share/nginx/html
COPY src/assets/silent-check-sso.html /usr/share/nginx/html/browser

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

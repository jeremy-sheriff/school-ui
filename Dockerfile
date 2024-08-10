# Stage 1: Build the Angular app
FROM node:20-alpine AS build

WORKDIR /app

COPY . .

RUN npm install -g @angular/cli@16.2.12
RUN npm uninstall atq
RUN npm install --legacy-peer-deps --no-package-lock

# Pass the build number as an environment variable
ARG BUILD_NO
ENV BUILD_NO=$BUILD_NO

RUN npm run prebuild
RUN npm run build -- --configuration=production

WORKDIR /app/dist/atq

# Stage 2: Serve the Angular app using Nginx
FROM nginx:latest

COPY --from=build /app/dist/atq /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

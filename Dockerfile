#!/bin/sh
# Get Nginx image from Docker hub
FROM nginx:1.21.6
#FROM node:10
# Copy our configuration file to nginx path

COPY default.conf.template /etc/nginx/conf.d/default.conf.template
COPY nginx.conf /etc/nginx/nginx.conf

# Update available packages in Debian
RUN apt-get update


# Configure Nginx port for heroku
#CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'

RUN sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf.template

# Install curl cmd line tool
#RUN apt-get install curl -y

# Fetch latest node v10.x from nodesource
#RUN curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh

# Run setup script
#RUN bash nodesource_setup.sh

# install nodejs and npm
#RUN apt install nodejs -y

# Change work dir
#WORKDIR /usr/src/app

# Copy everything 
#COPY . .

# Do a clean install based on package-lock file
#RUN npm ci

# Build frontend
#RUN npm run build



COPY build/ /usr/share/nginx/html

# Expose port picked by Heroku. Otherwise we couldn't connect to the server running inside a docker container
EXPOSE $PORT


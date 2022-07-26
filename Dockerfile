FROM nginx

FROM node:10

# Update available packages in Debian
RUN apt-get update

# Install curl cmd line tool
RUN apt-get install curl -y

# Change work dir
WORKDIR /usr/src/app

# Fetch latest node v10.x from nodesource
RUN curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh

# Run setup script
RUN bash nodesource_setup.sh

# install nodejs and npm
RUN apt install nodejs -y




# Build frontend
RUN npm run build
# Expose port picked by Heroku. Otherwise we couldn't connect to the server running inside a docker container

COPY build/ /usr/share/nginx/html

EXPOSE $PORT







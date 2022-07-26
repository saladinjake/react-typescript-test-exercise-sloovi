# Get Nginx image from Docker hub
FROM nginx:1.17.8-alpine


RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf.template /etc/nginx/conf.d/default.conf


FROM node:10


#COPY nginx.conf /etc/nginx/nginx.conf

# Configure Nginx port for heroku
#CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
# or this 2 lines below


# Copy our configuration file to nginx path

COPY default.conf.template /etc/nginx/conf.d/default.conf


# COPY nginx.conf /etc/nginx/conf.d/default.conf
 CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'

# Update available packages in Debian
RUN apt-get update

# Install curl cmd line tool
RUN apt-get install curl -y

# Fetch latest node v10.x from nodesource
RUN curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh

# Run setup script
RUN bash nodesource_setup.sh

# install nodejs and npm
RUN apt install nodejs -y



# Change work dir
WORKDIR /usr/src/app


COPY build/ /usr/share/nginx/html
COPY server.js /usr/share/nginx/html

EXPOSE $PORT






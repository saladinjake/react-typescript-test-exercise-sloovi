

########################################################################### FRONTEND DEVOPS DEPLOYMENT WITH DOCKER STAND ALONE ##################################################
# @task : deploy application using nginx as a reverse porxy and load balancer
# @desc: All api endpoints should proxy into the backend api given in the task asignment
#        meet the ui design specification
#        deploy  working url on your favorite platform
# @author: saladinjake
#
#################################################################################################################################################################################

########################################################
# STAGE 1 : SIMULATE NODE REACT APP AND RUN THE BUILD  #
########################################################

# pull official base image

FROM node:10 AS builder

# set working directory

WORKDIR /app


# install app dependencies
#copies package.json and package-lock.json to Docker environment
COPY package.json ./

# Installs all node packages
RUN npm install 


# Copies everything over to Docker environment
COPY . ./
RUN npm run build





####################################################################################################################
#Stage 2 Build nginx process and move build files to replace default nginx html file as well as default nginx conf #
####################################################################################################################

#pull the official nginx:1.19.0 base image

FROM nginx:1.19.0

#copies React to the container directory
# Set working directory to nginx resources directory

WORKDIR /usr/share/nginx/html

# Remove default nginx static resources

RUN rm -rf ./*

# Copies static resources from builder stage

COPY --from=builder /app/build .
# Containers run nginx with global directives and daemon off


# move the custom nginx conf with the proxied api 
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf




##################################################################################
# FINALLY: EXPOSE PORTS SHARE HEROKU PORT WITH NGIX CONF AND LAUNCH NGINX #      
##################################################################################

# Lets use default port 80 for testing locally when trying out that it works before pushing to deployment
ENV PORT=80

# Configure Nginx port for heroku
#CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'

# OR:  Configure Nginx port for heroku
# Replace $PORT with $PORT value and run nginx.
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'



#ENTRYPOINT ["nginx", "-g", "daemon off;"]
# OR
#CMD ["nginx", "-g", "daemon off;"]

# Expose port picked by Heroku. Otherwise we couldn't connect to the server running inside a docker container
EXPOSE $PORT






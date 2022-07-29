
## Heroku Deploy with docker nginx 

### read me instruction running docker locally
-to run docker example locally 
- uncomment the PORT=80  
- docker build . -t demo-example2
- docker run -p 80:80 demo-example2  # runs locally at localhost:80 or just localhost

- NAVIGATE TO localhost to see it in action

example

- docker build -t example-react-app .  #build locally
- docker build -t <hub-user>/<repo-name>[:<tag>] #send to your docker registry if you wish its optional
- docker run — rm -it -p 8080:80 example-react-app   # run locally at localhost:8080


### read me instruction running without docker
- ensure you proxy the backend api in the package.json proxy key as its value eg "proxy": "https://mybackendurl/"
- npm run start:dev

[![Deploy] to heroku



- heroku login
- heroku container:login
- heroku create --app  final-demo-exercise
- heroku container:push web -a final-demo-exercise
- heroku container:release web -a -a final-demo-exercise
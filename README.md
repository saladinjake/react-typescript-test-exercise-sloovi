## deploying with ngix acting as proxy steps

## step 1
- heroku login
- git remote rm heroku 
- heroku create --app sloovi-takehome-exercise
-  git add .
- git commit -m "deploy works"
- git push origin master
- git push heroku master


## step 2
- heroku buildpacks:add https://github.com/heroku/heroku-buildpack-nginx
- edit your code file
-  git add .
- git commit -m "deploy works"
- git push origin master
- git push heroku master

- Best Regards
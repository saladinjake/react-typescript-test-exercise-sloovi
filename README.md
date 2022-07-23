git remote rm heroku 
heroku buildpacks:add https://github.com/heroku/heroku-buildpack-nginx 
git add .
git commit -m "deploy works"
git push origin master
git push heroku master
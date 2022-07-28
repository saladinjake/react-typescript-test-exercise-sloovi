/*Load compiled build files on local server */
const express = require('express');
const path = require('path');
var fs = require('fs');
const app = express();
const PORT = process.env.PORT || 8000;

const { createProxyMiddleware } = require('http-proxy-middleware');

const proxyConfig = {
  target: "https://stage.api.sloovi.com",
  prependPath: true,
  changeOrigin: true,
  ws: true,
  pathRewrite: {
    '^/api/*': '/',
  },
};

//const cors = require("cors");

app.use(express.static(`${__dirname}/build/`));
//app.use(cors())
 // All routes starting with /api have this proxy middleware applied
//app.use(createProxyMiddleware('/api/*', proxyConfig));
//app.use(createProxyMiddleware('/api/login', proxyConfig));
//app.use(createProxyMiddleware('/api/team/*', proxyConfig));
//app.use(createProxyMiddleware('/api/task/*', proxyConfig));


// const proxy=require('http-proxy-middleware');
// module.exports = function(app) {
//     app.use(proxy('/api/login',{target:'https://stage.api.sloovi.com/login'})),
//     app.use(proxy('/api/teams',{target:'https://stage.api.sloovi.com/teams'})),
//     app.use(proxy('/api/task',{target:'https://stage.api.sloovi.com'}))
// }


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './build/index.html'));
});







// app.set('views', __dirname + '/build');

// app.get('*', function(request, response) {
//   response.render('index.html');
//   //res.sendFile(path.resolve(__dirname, './build/index.html'));
// });

app.listen(PORT || 3000, function() {
  if (process.env.DYNO) {
    console.log('This service is only available on heroku..!!');
    fs.closeSync(fs.openSync('/tmp/app-initialized', 'w'))
  }
  console.log('Node app is running on port', process.env.PORT || 3000);
});


module.exports=app;
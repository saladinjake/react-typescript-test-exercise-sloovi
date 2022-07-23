/*Load compiled build files on local server */
const express = require('express');
const path = require('path');
var fs = require('fs');
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.static(`${__dirname}/build/`));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './build/index.html'));
});





// app.set('views', __dirname + '/build');

// app.get('*', function(request, response) {
//   response.render('index.html');
//   //res.sendFile(path.resolve(__dirname, './build/index.html'));
// });

app.listen(PORT, function() {
  if (process.env.DYNO) {
    console.log('This service is only available on heroku..!!');
    fs.openSync('/tmp/app-initialized', 'w');
  }
  console.log('Node app is running on port', process.env.PORT || 8000);
});


module.exports=app;
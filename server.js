/*Load compiled build files on local server */
const express = require('express');
const path = require('path');
var fs = require('fs');
const app = express();

// app.use(express.static(`${__dirname}/build/`));
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './build/index.html'));
// });


const PORT = process.env.PORT || 8000;
const { log } = console;
app.listen(PORT, () => {
  log('Server started on port: ', PORT);

});


app.set('views', __dirname + '/build');

app.get('*', function(request, response) {
  response.render('index.html');
});

app.listen(process.env.PORT || 5000, function() {
  if (process.env.DYNO) {
    console.log('This is on Heroku..!!');
    fs.openSync('/tmp/app-initialized', 'w');
  }
  console.log('Node app is running on port', process.env.PORT || 5000);
});
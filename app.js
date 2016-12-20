var express = require('express');
var blogController = require('./controllers/blogController');
var app = express();

app.set('port', (process.env.PORT || 3000))
app.set('view engine', 'ejs');
app.use(express.static('./public'));

blogController(app);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

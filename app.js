var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 3000))
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render('index');
});

app.get('/post/:id', function(req, res){
  var data = {title: 'title', body: 'hey there', hobbies: ['eating','fighting','fishing']};
  res.render('post', {id: req.params.id, data: data});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

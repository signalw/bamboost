module.exports = function(app){

app.get('/', function(req, res){
  res.render('index');
});

app.get('/post/:id', function(req, res){
  var data = {title: 'title', body: 'hey there', hobbies: ['eating','fighting','fishing']};
  res.render('post', {id: req.params.id, data: data});
});

};

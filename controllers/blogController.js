var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

mongoose.connect(process.env.MONGODB_URI);

var blogSchema = new mongoose.Schema({
  title: String,
  body: String,
  body_preview: String,
  comments: [{ nickname: String, body: String, date: { type: Date, default: Date.now }}],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  tags: [String]
});

var Blog = mongoose.model('blog', blogSchema);

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

app.get('/', function(req, res){
  Blog.find({}, function(err, data){
    if (err) throw err;
    res.render('index', {blogs: data});
  });
});

app.post('/', urlencodedParser, function(req, res){
  var newBlog = Blog(req.body).save(function(err, data){
    if (err) throw err;
    res.json(data);
  });
});

app.get('/post/:pid', function(req, res){
  Blog.findOne({date: {$eq: new Date(+req.params.pid)}}, function(err, data){
    if (err) throw err;
    res.render('post', {blog: data});
  });
});

app.post('/post/:pid', urlencodedParser, function(req, res){
  Blog.findOneAndUpdate({date: {$eq: new Date(Number(req.params.pid))}},
    {$push: {"comments": req.body}}, function(err, data){
    if (err) throw err;
    res.json(data);
  });
});

};

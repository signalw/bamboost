var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

var Blog = require('../models/blog')

const PAGESIZE = 3;

module.exports = function(app){

app.get('/', function(req, res){
  Blog.count({}, function(err, count){
    var lastPage = (count-1)/PAGESIZE+1;
    Blog.find({hidden: false}, null, {limit: PAGESIZE, sort: '-date'},
      function(err, data){
      if (err) throw err;
      res.render('index', {blogs: data, page: 1, lastPage: lastPage});
    });
  });
});

app.get('/:page_num', function(req, res){
  var page = parseInt(req.params.page_num.split('.')[1]);
  page = page > 0 ? page : 1;
  Blog.count({}, function(err, count){
    var lastPage = (count-1)/PAGESIZE+1;
    page = page < lastPage ? page : lastPage
    var skip = (page-1) * PAGESIZE;
    Blog.find({hidden: false}, null, {skip: skip, limit: PAGESIZE,
      sort: '-date'}, function(err, data){
      if (err) throw err;
      res.render('index', {blogs: data, page: page, lastPage: lastPage});
    });
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

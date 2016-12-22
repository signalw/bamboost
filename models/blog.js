var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB_URI);

var blogSchema = new mongoose.Schema({
  title: String,
  body: String,
  body_preview: String,
  comments: [{ nickname: String, body: String,
    date: { type: Date, default: Date.now }}],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  tags: [String]
});

var Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;

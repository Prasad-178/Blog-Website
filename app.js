//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash")

const homeStartingContent = "Welcome to my Blog!!";

const aboutContent = "this is the aboutContent";

const contactContent = "this is the contactContent";

var posts = []

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', (req, res) => {
  res.render('home', {homeStartingContent: homeStartingContent, posts: posts})
})

app.get('/about', (req, res) => {
  res.render('about', {aboutContent: aboutContent})
})

app.get('/contact', (req, res) => {
  res.render('contact', {contactContent: contactContent})
})

app.get('/compose', (req, res) => {
  res.render('compose')
})

app.get('/posts/:postName', (req, res) => {
  var title = ""
  var content = ""
  for (let i=0; i<posts.length; i++) {
    if (_.lowerCase(req.params.postName) === _.lowerCase(posts[i].title)) {
      title = posts[i].title
      content = posts[i].body
      console.log("Match Found!!")
    }
  }

  res.render('post', {title: title, content: content})
})

app.post('/compose', (req, res) => {
  const post = {
    title: req.body.postTitle,
    body: req.body.postBody
  }
  posts.push(post)

  res.redirect('/')
})




app.listen(3000, function() {
  console.log("Server started on port 3000");
});

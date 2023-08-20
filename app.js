//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Welcome to our daily blog, a hub of diverse insights, inspiration, and connections. Explore the latest trends in technology, poignant human stories, global affairs, wellness tips, and more. Join our community in embracing the joy of learning and sharing perspectives. This is more than a blog; it's an invitation to make each day extraordinary.";
const aboutContent = "Discover the essence of our daily blog, where curiosity knows no bounds. We're a passionate team dedicated to curating a medley of insights, trends, and stories that enrich your daily journey. With a focus on technology, humanity, global affairs, wellness, and beyond, we aim to inspire and inform. Our community thrives on the joy of learning and exchanging perspectives, transcending the ordinary to make each day exceptional. Join us as we celebrate the beauty of knowledge and the power of connection.";
const contactContent = "Get in Touch: We'd love to hear from you! Whether you have questions, suggestions, or simply want to connect, reaching out is easy. Feel free to drop us a line through the provided contact form below. Your feedback fuels our passion to create meaningful content that resonates with our community. Thank you for being a part of our journey towards making each day extraordinary";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

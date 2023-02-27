const Blog = require("../models/blog");
const Link = require("../models/link");
const Category = require("../models/category");
const mongoose = require("mongoose");

module.exports.getBlogs = (req, res, next) => {
  Blog.find()
    .populate("comments.user")
    .populate("comments.replies.user")
    .then((blogs) => {
      res.send(blogs);
    })
    .catch((err) => console.log(err));
};

module.exports.getCategories = (req, res, next) => {
  Category.find()
    .then((categories) => {
      res.json(categories);
    })
    .catch((err) => console.log(err));
};

module.exports.getLinkTree = (req, res, next) => {
  Link.find()
    .then((links) => {
      res.json(links);
    })
    .catch((err) => console.log(err));
};

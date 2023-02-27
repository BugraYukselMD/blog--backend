const mongoose = require("mongoose");
const Blog = require("../models/blog");
const Link = require("../models/link");
const Category = require("../models/category");
const driverService = require("../utils/driveService");

module.exports.postBlogCoverImage = async (req, res, next) => {
  var image = req.file;

  if (image) {
    image = await driverService.blogCreateAndUploadFile(image);
    image = image.data.id;
  }
  res.json({
    id: image,
  });
};

module.exports.postAddBlog = async (req, res, next) => {
  const title = req.body.title;
  const readMin = req.body.readMin;
  const body = req.body.body;
  const categories = req.body.categories;
  const image = req.body.coverImg;

  const blog = new Blog({
    _id: mongoose.Types.ObjectId(),
    title: title,
    readMin: readMin,
    coverImg: image,
    categories: categories,
    body: body,
  });
  blog
    .save()
    .then((blog) => {
      res.json({
        success: true,
        message: "Blog added!",
        blog: blog,
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        message: err,
      });
    });
};

module.exports.postEditBlog = async (req, res, next) => {
  const blogid = req.body._id;
  const title = req.body.title;
  const readMin = req.body.readMin;
  const body = req.body.body;
  const categories = req.body.categories;
  const image = req.body.coverImg;

  if (image) {
    Blog.findOne({ _id: blogid }).then((blog) => {
      const oldImg = blog.coverImg;

      if (oldImg && oldImg == image) {
        driverService.deleteFile(oldImg);
      }
    });
  }

  Blog.updateOne(
    { _id: blogid },
    {
      $set: {
        title: title,
        readMin: readMin,
        coverImg: image,
        body: body,
        categories: categories,
      },
    }
  )
    .then(() => {
      Blog.findOne({ _id: blogid }).then((blog) => {
        res.json({
          success: true,
          message: "Blog edited!",
          blog: blog,
        });
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        message: err,
      });
    });
};

module.exports.postDeleteBlog = (req, res, next) => {
  const blogid = req.body.blogid;

  Blog.findOne({ _id: blogid }).then((blog) => {
    if (blog.coverImg || blog.coverImg != undefined || blog.coverImg != null) {
      driverService.deleteFile(oldImg);
    }
  });

  Blog.deleteOne({ _id: blogid })
    .then(() => {
      res.json({
        success: true,
        message: "Blog deleted!",
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        message: err,
      });
    });
};

module.exports.postAddLink = async (req, res, next) => {
  const linkName = req.body.linkName;
  const linkUrl = req.body.linkUrl;
  const linkImage = req.body.linkImage;

  const link = new Link({
    _id: mongoose.Types.ObjectId(),
    linkName: linkName,
    linkUrl: linkUrl,
    linkImage: linkImage,
  });

  link
    .save()
    .then((link) => {
      res.json({
        success: true,
        message: "Link added!",
        link: link,
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        message: err,
      });
    });
};

module.exports.postDeleteLink = (req, res, next) => {
  const linkid = req.body.linkid;

  Link.findByIdAndRemove({ _id: linkid })
    .then(() => {
      res.json({
        success: true,
        message: "Blog deleted!",
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        message: err,
      });
    });
};

module.exports.postAddCategory = (req, res, next) => {
  const categoryName = req.body.categoryName;

  const category = new Category({
    _id: mongoose.Types.ObjectId(),
    categoryName: categoryName,
  });
  category
    .save()
    .then((category) => {
      res.json({
        success: true,
        message: "Category added!",
        category: category,
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        message: err,
      });
    });
};

module.exports.postDeleteCategory = (req, res, next) => {
  const categoryid = req.body.categoryid;

  Category.findByIdAndRemove({ _id: categoryid })
    .then(() => {
      res.json({
        success: true,
        message: "Category deleted!",
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        message: err,
      });
    });
};

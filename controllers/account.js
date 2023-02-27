const User = require("../models/user");
const Blog = require("../models/blog");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const driverService = require("../utils/driveService");
const tools = require("../utils/tools");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  service: "gmail",
  auth: {
    user: "bugrayukselwebsite@gmail.com",
    pass: "wquoljcrwyogiihh",
  },
});

const DEFAULT_IMAGE_ID = "1QCcp8bV5wvuTawCRMmjwPMGn-vAvqpBY";

module.exports.checkToken = (req, res, next) => {
  return res.status(200).json({
    success: true,
    status: "Token Valid!",
  });
};

module.exports.postUserImage = async (req, res, next) => {
  var image = req.file;

  if (image) {
    image = await driverService.userCreateAndUploadFile(image);
    image = image.data.id;
  }
  res.json({
    id: image,
  });
};

module.exports.postLogin = (req, res, next) => {
  try {
    const email = req.body.email;
    const password = tools.Decrypt(req.body.password);

    User.findOne({ email: email }).then((user) => {
      if (!user) {
        return res.status(401).send("Wrong E-Mail!");
      } else {
        bcrypt.compare(password, user.password).then((isSucces) => {
          if (isSucces) {
            let tokens = tools.createToken(user);

            return res.status(200).json({
              status: "Succesfully Logged In!",
              token: tokens.token,
              refreshToken: tokens.refreshToken,
              success: true,
            });
          } else {
            return res.status(401).send("Wrong Password!");
          }
        });
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.postRegister = async (req, res, next) => {
  const name = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const passwordAgain = req.body.passwordAgain;
  const image = req.body.imageUrl;

  if (password !== passwordAgain) {
    res.json({
      success: false,
      message: "Şifreler birbiriyle aynı değil!",
    });
  } else {
    User.findOne({ email: email })
      .then((user) => {
        if (user) {
          res.json({
            success: false,
            message: "Bu kullanıcı sistemde zaten kayıtlı!",
          });
        }
        return bcrypt.hash(password, 10);
      })
      .then((hashedPassword) => {
        const newUser = new User({
          name: name,
          email: email,
          imageUrl: image,
          password: hashedPassword,
        });
        newUser.save();
      })
      .then(() => {
        var mailOptions = {
          from: "bugrayukselwebsite@gmail.com",
          to: email,
          subject: "Hesap Aktivasyonu",
          html: "<h1>Hesabınız başarılı bir şekilde oluşturuldu!</h1>",
        };

        transporter.sendMail(mailOptions);
        res.json({
          success: true,
          message: "Kullanıcı başarıyla eklendi!",
        });
      })
      .catch((err) => {
        res.json({
          success: false,
          message: err,
        });
      });
  }
};

module.exports.postComment = (req, res, next) => {
  const blogid = req.body.blogid;
  const message = req.body.comment;
  const user = req.decoded.user;

  Blog.findOne({ _id: blogid })
    .then((blog) => {
      blog.addComment(message, user);
      return blog;
    })
    .then((blog) => {
      res.json({
        success: true,
        message: "Comment added!",
        comment: blog.comments.find((item) => item.message == message),
        user,
        user,
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        message: err,
      });
    });
};

module.exports.postReply = (req, res, next) => {
  const blogid = req.body.blogid;
  const commentid = req.body.commentid;
  const reply = req.body.reply;
  const user = req.decoded.user;

  Blog.findOne({ _id: blogid })
    .then((blog) => {
      blog.addReply(commentid, reply, user);
    })
    .then(() => {
      res.json({
        success: true,
        message: "Reply added!",
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        message: err,
      });
    });
};

module.exports.deleteComment = (req, res, next) => {
  const blogid = req.body.blogid;
  const commentid = req.body.commentid;

  Blog.findOne({ _id: blogid })
    .then((blog) => {
      blog.deleteComment(commentid);
      return blog.then(() => {
        res.json({
          success: true,
          message: "Comment deleted!",
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

module.exports.deleteReply = (req, res, next) => {
  const replyid = req.body.replyid;
  const blogid = req.body.blogid;

  Blog.findOne({ _id: blogid })
    .then((blog) => {
      blog.deleteReply(replyid);
    })
    .then(() => {
      res.json({
        success: true,
        message: "Comment deleted!",
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        message: err,
      });
    });
};

module.exports.addFavourite = (req, res, next) => {
  const blogid = req.body.blogid;
  const userid = req.body.userid;

  User.findOne({ _id: userid })
    .then((user) => {
      user.addFavourites(blogid);
      res.json({
        success: true,
        message: "Added to favourites!",
        favourites: user.favourites ? user.favourites : [],
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        message: err,
      });
    });
};

module.exports.removeFavourite = (req, res, next) => {
  const blogid = req.body.blogid;
  const userid = req.body.userid;

  User.findOne({ _id: userid })
    .then((user) => {
      user.deleteFavourite(blogid);
      console.log(user.favourites);
      res.json({
        success: true,
        message: "Removed from favourites!",
        favourites: user.favourites ? user.favourites : [],
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        message: err,
      });
    });
};

module.exports.editProfile = async (req, res, next) => {
  const userid = req.body.userid;
  const name = req.body.name;
  const oldImageUrl = req.body.oldImageUrl;
  const imageUrl = req.body.imageUrl;

  /*
  if (oldImageUrl !== DEFAULT_IMAGE_ID && imageUrl && imageUrl != oldImageUrl) {
    response = await driverService.deleteFile(oldImageUrl);
  }*/

  User.updateOne(
    { _id: userid },
    {
      $set: {
        name: name,
        imageUrl: imageUrl,
      },
    }
  )
    .then(() => {
      return res.json({
        success: true,
        imageUrl: imageUrl,
        name: name,
        message: "Profile edited!",
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        message: err,
      });
    });
};

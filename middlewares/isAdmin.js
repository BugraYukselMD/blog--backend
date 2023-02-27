let jwt = require("jsonwebtoken");
const config = require("../config.js");

module.exports = (req, res, next) => {
  // Express headers are auto converted to lowercase
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (token != undefined && token.startsWith("Bearer<")) {
    // Remove 'Bearer' from string
    token = token.slice(7, token.length - 1);
  }

  if (token && token != "undefined" && token != undefined) {
    let user = jwt.decode(token).user;

    if (user.isAdmin) {
      next();
    } else {
      return res.json({
        success: false,
        message: "Admin authorization failed!",
      });
    }
  } else {
    return res.json({
      success: false,
      message: "Auth Token Is Not Supplied!",
    });
  }
};

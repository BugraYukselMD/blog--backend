const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports.Decrypt = function (password) {
  let keyStr =
    "ABCDEFGHIJKLMNOP" +
    "QRSTUVWXYZabcdef" +
    "ghijklmnopqrstuv" +
    "wxyz0123456789+/" +
    "=";

  var output = "";

  var i = 0;
  password = password.replace("/[^ A - Za - z0 - 9+/=] / g", "");
  do {
    var enc1 = keyStr.indexOf(password[i++]);
    var enc2 = keyStr.indexOf(password[i++]);
    var enc3 = keyStr.indexOf(password[i++]);
    var enc4 = keyStr.indexOf(password[i++]);

    var chr1 = (enc1 << 2) | (enc2 >> 4);
    var chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    var chr3 = ((enc3 & 3) << 6) | enc4;

    output = output + String.fromCharCode(chr1);
    if (enc3 != 64) {
      output = output + String.fromCharCode(chr2);
    }
    if (enc4 != 64) {
      output = output + String.fromCharCode(chr3);
    }
    chr1 = chr2 = chr3 = null;
    enc1 = enc2 = enc3 = enc4 = null;
  } while (i < password.length);
  output = unescape(output);
  var pattern = new RegExp("[|]");
  output = output.replace(pattern, "+");
  return output;
};

module.exports.createToken = function (user) {
  var data = {
    user: user,
    isAuthenticated: true,
  };

  var token = jwt.sign(data, config.secret, {
    expiresIn: "1h", // expires in 1 hour
  });

  var refreshToken = jwt.sign(data, config.secret, {
    expiresIn: "2h", // expires in 2 hour
  });

  return {
    token: token,
    refreshToken: refreshToken,
  };
};

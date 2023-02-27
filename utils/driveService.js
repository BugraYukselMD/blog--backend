var { google } = require("googleapis");
const fs = require("fs");

// Service account key file from google cloud console
const KEYPATH = "./ServiceAccountCred.json";

// Add drive scope will give us full access to Google Drive account
const SCOPES = ["https://www.googleapis.com/auth/drive"];

//init the auth with the needed keyfile and scopes
const auth = new google.auth.GoogleAuth({
  keyFile: KEYPATH,
  scopes: SCOPES,
});

module.exports.userCreateAndUploadFile = async (image) => {
  // init drive service, it will now handle all authorization.
  const driveService = google.drive({ version: "v3", auth });

  // metadata for the new file on Google Drive
  const fileMetadata = {
    name: `${image.filename}`,
    parents: ["1LwYItqOOL8S_GgmLyvTi6H6XCPXQ3too"],
  };

  // media definition of the file
  const media = {
    mimeType: image.mimeType,
    body: fs.createReadStream(`public/uploads/${image.filename}`),
  };

  // create the requests
  try {
    const file = driveService.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id",
    });
    return file;
  } catch (err) {
    throw err;
  }
};

module.exports.blogCreateAndUploadFile = async (image) => {
  // init drive service, it will now handle all authorization.
  const driveService = google.drive({ version: "v3", auth });

  // metadata for the new file on Google Drive
  const fileMetadata = {
    name: `${image.filename}`,
    parents: ["1oab0PN4GkWSSmnXzsm19HY-dYHXz--pN"],
  };

  // media definition of the file
  const media = {
    mimeType: image.mimeType,
    body: fs.createReadStream(`public/uploads/${image.filename}`),
  };

  // create the requests
  try {
    const file = driveService.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id",
    });
    return file;
  } catch (err) {
    throw err;
  }
};

module.exports.linkCreateAndUploadFile = async (image) => {
  // init drive service, it will now handle all authorization.
  const driveService = google.drive({ version: "v3", auth });

  // metadata for the new file on Google Drive
  const fileMetadata = {
    name: `${image.filename}`,
    parents: ["127k32EbbTtsQ0Ieevl85TVtzNryuFTgW"],
  };

  // media definition of the file
  const media = {
    mimeType: image.mimeType,
    body: fs.createReadStream(`public/uploads/${image.filename}`),
  };

  // create the requests
  try {
    const file = driveService.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id",
    });
    return file;
  } catch (err) {
    throw err;
  }
};

module.exports.deleteFile = async (imageId) => {
  // init drive service, it will now handle all authorization.
  const driveService = google.drive({ version: "v3", auth });

  var response = driveService.files.delete({
    fileId: imageId,
  });

  return response;
};

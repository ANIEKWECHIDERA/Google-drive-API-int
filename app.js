"use strict";

const { google } = require("googleapis");
require("dotenv").config();
const path = require("path");
const fs = require("fs");
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);

oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

const drive = google.drive({ version: "v3", auth: oauth2Client });
const filePath = path.join(
  __dirname,
  "pC-c4kxcgLxiliked_by-20240809_144730-An8Co9FDRy_cba6ZKpxTIgoeXYSjIp8HMnL_RbJMrE53oghD29GOvEgOhkmROYf4VN6gl9du4uoSKBll7bTpnF3S.mp4"
);
const mimeType = getMimeType(filePath);

// Helper function to detect MIME type
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".mp4":
      return "video/mp4";
    case ".jpeg":
    case ".jpg":
      return "image/jpeg";
    // Add more MIME types if necessary
    default:
      return "application/octet-stream";
  }
}
async function uploadFile() {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: path.basename(filePath),
        mimeType: mimeType,
      },
      media: {
        mimeType: mimeType,
        body: fs.createReadStream(filePath),
      },
    });

    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
}

uploadFile();

//function for deleting a file
async function deleteFile() {
  try {
    const response = await drive.files.delete({
      fileId: "",
    });
    console.log(response.data, response.status);
  } catch (error) {
    console.log(error.message);
  }
}

// deleteFile();

//generate public URL
async function generatePublicUrl() {
  try {
    const fileId = "1AH3wcjZ4L2S7Y0hvYLk-X0U4EEUndvZu";
    const response = await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    const result = await drive.files.get({
      fileId: fileId,
      fields: "webContentLink",
    });

    console.log(result.data, response.status);
  } catch (error) {
    console.log(error.message);
  }
}

generatePublicUrl();

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
const filePath = path.join(__dirname, "DWBB Academy Webinar Flier.jpg");

async function uploadFile() {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: "DWBB Academy Webinar Flier.jpg",
        mimeType: "image/jpeg",
      },
      media: {
        mimeType: "image/jpeg",
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

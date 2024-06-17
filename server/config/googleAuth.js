const { google } = require("googleapis");
const { GoogleAuth } = require("google-auth-library");
const path = require("path");

const KEYFILEPATH = path.join(__dirname, "./keyFile.json");
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

const auth = new GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

const sheets = google.sheets({ version: "v4", auth });

module.exports = sheets;

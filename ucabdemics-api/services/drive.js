const { config } = require('../config/index');
const { google } = require('googleapis');
const fs = require('fs');
const credentials = require(config.credentialPath);
const scopes = ['https://www.googleapis.com/auth/drive'];
const auth = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  scopes
);
const drive = google.drive({ version: 'v3', auth });

/* drive.files.list({}, (err, res) => {
  if (err) throw err;
  const files = res.data.files;
  if (files.length) {
    files.map((file) => {
      console.log(file);
    });
  } else {
    console.log('No files found');
  }
}); */

var dest = fs.createWriteStream('file.csv');

drive.files.get(
  {
    fileId: '11-G08_RCjM4VkANJACYYbJXLe5-T4v4k',
    alt: 'media',
  },
  { responseType: 'stream' },
  (err, res) => {
    res.data
      .on('end', function () {
        console.log('Done');
      })
      .on('error', function (err) {
        console.log('Error during download', err);
      })
      .pipe(dest);
  }
);

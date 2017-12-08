require('dotenv').config();
const path = require('path');
const express = require('express');
const proxy = require('express-http-proxy');
const app = express();
const baseImageUrl = process.env.BASE_IMAGE_URL;
const proxyBaseImageUrl = baseImageUrl
  ? proxy(baseImageUrl, {
      proxyReqPathResolver: function(req) {
        // req.path would be the name of the image the user is looking for
        const newPath = baseImageUrl + req.path;
        console.log(newPath);
        return newPath;
      }
    })
  : express.static(path.join(__dirname, 'public/images'));

app.use('/images', proxyBaseImageUrl);

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world to ya');
});

// const MongoClient = require('mongodb').MongoClient;
//
// MongoClient.connect(process.env.MONGO_URI, function(err, db) {
//   if (err) {
//     console.log('There was an error connect to MongoDB: ', err);
//   } else {
//     console.log('Connected to MongoDB!');
//   }
// });

app.listen(8080, () => {
  console.log('server is listening on port 8080');
});

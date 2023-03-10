const express = require('express');
const { config } = require('dotenv');
config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
// Config path for const modules
const path = require('path');

const app = express();
const port = 3000;

const bootServer = () => {
   app.use(express.static(path.join(__dirname, 'src')));
   // app.use((req, res, next) => {
   //    res.setHeader('Access-Control-Allow-Origin', '*');
   //    res.setHeader('Access-Control-Allow-Credentials', 'true');
   //    res.setHeader('Access-Control-Max-Age', '1800');
   //    res.setHeader('Access-Control-Allow-Headers', 'content-type');
   //    res.setHeader(
   //       'Access-Control-Allow-Methods',
   //       'PUT, POST, GET, DELETE, PATCH, OPTIONS'
   //    );
   //    next();
   // });

   app.use(express.json());
   app.use(express.urlencoded({ extended: true }));
   app.use(cookieParser());

   app.get('/cookie', (req, res) => {
      res.send(req.headers);
   });

   app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, 'index.html'));
   });

   app.listen(port, () => {
      console.log(`Server running on port ${port}: http://localhost:${port}`);
   });
};

bootServer();

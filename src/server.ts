import express from 'express';
import { config } from 'dotenv';
config();
import cors from 'cors';
import { createStream } from 'rotating-file-stream';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
// Config path for import modules
import path from 'path';

import { routes } from './routes/index';
import { connectDB } from './config/connectDB';

const app = express();
const port = process.env.PORT;

connectDB().then(() => bootServer());

const bootServer = () => {
   const isProduction = process.env.NODE_ENV === 'production'; // để phân biệt dev và production
   // tạo file log theo ngày tới thư mục log trong thư mục gốc của project
   const accessLogStream = createStream('access.log', {
      interval: '1d', // rotate daily
      path: path.join(__dirname, 'log'),
   });


   app.use(express.static(path.join(__dirname, 'src')));
   // app.use((req, res, next) => {
   //    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
   //    res.setHeader('Access-Control-Allow-Credentials', 'true');
   //    res.setHeader(
   //       'Access-Control-Allow-Methods',
   //       'GET,HEAD,OPTIONS,POST,PUT'
   //    );
   //    res.setHeader(
   //       'Access-Control-Allow-Headers',
   //       'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
   //    );
   //    next();
   // });
   app.use(
      isProduction
         ? morgan('combined', { stream: accessLogStream })
         : morgan('dev')
   );
   app.use(express.json());
   app.use(express.urlencoded({ extended: true }));
   app.use(cookieParser());
   app.use(
      cors({
         credentials: true,
         origin: ['http://localhost:5173', 'http://localhost:3000'],
         allowedHeaders: [
            'Authorization',
            'Content-Type',
            'Access-Control-Request-Method',
            'X-Requested-With',
            'Accept',
            'Access-Control-Request-Headers',
            'Origin',
            'Access-Control-Allow-Headers',
         ],
         methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
         exposedHeaders: ['Access-Control-Allow-Origin'],
         preflightContinue: true,
         // optionSuccessStatus: 200,
      })
   );

   routes(app);

   app.listen(port, () => {
      console.log(`Server running on port ${port}: http://localhost:${port}`);
   });
};

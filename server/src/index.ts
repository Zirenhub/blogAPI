import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// routes
import indexRoute from './routes/index';
import authRoute from './routes/auth';

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.use('/', indexRoute);
app.use('/auth', authRoute);

mongoose.connect(process.env.DB_URI!).then(() => {
  app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
});

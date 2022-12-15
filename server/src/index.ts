import * as dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
// routes
import indexRouter from './routes/index';

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use('/', indexRouter);

mongoose.connect(`${process.env.DB_URI}`).then(() => {
  app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
});

import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
// routes
import indexRouter from './routes/index';
import signUpRouter from './routes/signUp';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

app.use('/', indexRouter);
app.use('/sign-up', signUpRouter);

mongoose.connect(process.env.DB_URI || '').then(() => {
  app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
});

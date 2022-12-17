import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
// routes
import indexRoute from './routes/index';
import signUpRoute from './routes/signUp';
import logInRoute from './routes/logIn';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.use('/', indexRoute);
app.use('/sign-up', signUpRoute);
app.use('/log-in', logInRoute);

mongoose.connect(process.env.DB_URI!).then(() => {
  app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
});

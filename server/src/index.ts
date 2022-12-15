import * as dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

mongoose.connect(`${process.env.DB_URI}`).then(() => {
  app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
});

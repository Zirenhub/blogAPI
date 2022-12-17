import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserModel from '../models/user';

export const logUser = [
  body('email', 'Invalid Email').isEmail().trim().escape().normalizeEmail(),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password Must Be at Least 8 Characters')
    .trim()
    .escape(),

  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        status: 'error',
        code: 400,
        data: { errors: errors.array() },
        message: null,
      });
    } else {
      const email: string = req.body.email;
      const password: string = req.body.password;

      const user = await UserModel.findOne({ email });

      if (!user) {
        return res.status(403).json({
          status: 'error',
          code: 403,
          data: null,
          message: 'No user found.',
        });
      }

      bcrypt.compare(password, user.password).then((result) => {
        if (result) {
          const token = jwt.sign({ _id: user._id }, process.env.MY_SECRET!, {
            expiresIn: '1h',
          });

          res.cookie('token', token, {
            httpOnly: true,
          });

          res.json({ status: 'success', data: null, message: null });
        } else {
          res.status(403).json({
            status: 'error',
            code: 403,
            data: null,
            message: 'Wrong password.',
          });
        }
      });
    }
  },
];

import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import UserModel from '../models/user';

export const createUser = [
  body('username')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Username cannot be empty'),
  body('email', 'Invalid Email')
    .isEmail()
    .trim()
    .escape()
    .normalizeEmail()
    .custom(async (value) => {
      return UserModel.exists({ email: value }).then((user) => {
        if (user) {
          return Promise.reject('E-mail already in use');
        }
      });
    }),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password Must Be at Least 8 Characters')
    .trim()
    .escape(),
  body('confirmPassword')
    .isLength({ min: 8 })
    .withMessage('Confirm password Must Be at Least 8 Characters')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match with password');
      }
      return true;
    }),

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
      const username: string = req.body.username;
      const email: string = req.body.email;
      const password: string = req.body.password;

      const newUser = new UserModel({
        username,
        email,
        password,
      });

      try {
        const createdUser = await newUser.save();
        res.json({ status: 'success', data: createdUser, message: null });
      } catch (err) {
        res
          .status(400)
          .json({ status: 'error', code: 400, data: err, message: null });
      }
    }
  },
];

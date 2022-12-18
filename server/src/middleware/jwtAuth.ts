import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface IRequestUser extends Request {
  user?: any;
}

const jwtAuth = (req: IRequestUser, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  try {
    const user = jwt.verify(token, process.env.MY_SECRET!);
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie('token');
    res.status(403).json({
      status: 'error',
      code: 403,
      data: null,
      message: 'Unauthorized',
    });
  }
};

export { jwtAuth, IRequestUser };

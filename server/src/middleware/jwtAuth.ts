import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface IRequestUser extends Request {
  user?: any;
}

const jwtAuth = (req: IRequestUser, res: Response, next: NextFunction) => {
  try {
    let token = req.header('Authorization');
    if (!token) {
      return res.status(403).json({
        status: 'error',
        code: 403,
        data: null,
        message: 'Unauthorized',
      });
    }
    if (token.startsWith('Bearer')) {
      token = token.slice(7, token.length).trimStart();
    }

    const verifed = jwt.verify(token, process.env.MY_SECRET!);
    req.user = verifed;
    next();
  } catch (err: any) {
    res.status(500).json({
      status: 'error',
      code: 500,
      data: err,
      message: err.message,
    });
  }
};

export { jwtAuth, IRequestUser };

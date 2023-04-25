import Jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AdminConfig } from '../models/config';

export default async (req: Request, res: Response, next: NextFunction) => {
  const TokenBearer = req.headers.authorization?.split(' ')[1] || '';
  const valid = Jwt.decode(TokenBearer);

  if (typeof valid === 'object' && valid !== null) {
    if (valid.iat && valid.exp) {
      //   console.log(Date.now() >= valid.exp);
      //   console.log(Date.now());
      console.log(valid.exp * 1000 - Date.now());
      Date.now() >= valid.exp * 1000 ? res.send('token broken') : next();
    }
  } else {
    res.status(404).send('not found authorization bearer');
  }
};

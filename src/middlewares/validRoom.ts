import { NextFunction, Request, Response } from 'express';

export const validExRoom = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const room = req.body.room;
  if (room.ROOM === 0 && room.SECTION === 2) {
    res.status(400).send('not valid ROOM === 0 and SECTION === 2');
  } else {
    next();
  }
};

import { Request, Response } from 'express';
import { Suwan } from '../models/suwan';
import { Room } from '../models/room';

const readMany = async (req: Request, res: Response) => {
  try {
    const result = await Suwan.find({}).populate('CUSTOMER').populate('ROOM');

    const rooms = await Room.find();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export default {
  readMany,
};

import { Request, Response, NextFunction } from 'express';
import { Mitor } from '../models/mitor';
import { Room } from '../models/room';

export const validMitor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let MID = req.params.MID || null;
    const RID = req.params.RID;
    /**
     * search MID when this middleware use for '/mitor-mitor' endpoint
     */
    if (MID === null) {
      const searchRoomForMitor = await Room.findOne({ _id: RID }).populate(
        'MITOR',
      );
      if (searchRoomForMitor === null) {
        res.status(400).send('bad rerquest');
      } else {
        MID = searchRoomForMitor.MITOR._id.toString();
      }
    }

    /**
     * check mitor
     */
    const valMitor = await Mitor.findOne({ _id: MID }); // return for check
    if (valMitor === null) {
      res.status(404).send(`not found mitor record`);
    } else {
      /**
       *
       * month fill
       */
      const oldMitorRecord = valMitor.MITOR[valMitor.MITOR.length - 1]; // return { NUM:number, TIME_EDIT: Date }

      // return number of month
      const oldMonth = new Date(oldMitorRecord.TIME_EDIT).getMonth();
      const currentMonth = new Date(req.body.mitor.TIME_EDIT).getMonth();

      /**
       *
       *
       * mitor fill
       */
      const oldNumMitor = oldMitorRecord.NUM; // return number
      const currentMitor = req.body.mitor.NUM; // return number

      /**
       *
       * oldMonth in database more then > currentMonth form client
       */
      if (oldMonth >= currentMonth) {
        /* respones fails */
        res.status(400).json({
          msg: 'date time is mistake at less then oldMonth',
          status: 400,
        });
      } else {
        /**
         *
         * dubble check mitor
         */
        if (oldNumMitor > currentMitor) {
          res.status(400).send('bad mitor');
        } else {
          next();
        }
      }
    }
    // find Mitor
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

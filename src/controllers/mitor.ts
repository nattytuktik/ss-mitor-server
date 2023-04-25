import { Request, Response, NextFunction } from 'express';
import { Mitor } from '../models/mitor';

/**====================================================================================================================
 *=============================================== CREATE ==============================================================
 * @param req
 * @param res
 */
const create = async (req: Request, res: Response) => {
  try {
    const mitor = req.body.mitor || {};
    if (mitor === null) {
      res.status(400).send('have no mitor in body request');
    } else {
      const mitorDoc = new Mitor();

      mitorDoc.MITOR.push({
        NUM: mitor.num,
        TIME_EDIT: new Date(mitor.TIME_EDIT),
      });
      const result = mitorDoc.save();
      res.status(200).json(result);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

/**====================================================================================================================
 *====================================== READ MANY =========================================================================
 * @param req
 * @param res
 */
const readMany = async (req: Request, res: Response) => {
  try {
    const result = await Mitor.find({});
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
/**====================================================================================================================
 *====================================== READ ONE =========================================================================
 * @param req
 * @param res
 */
const readById = async (req: Request, res: Response) => {
  try {
    const MID = req.params.MID || {};
    if (MID === null) {
      res.status(400).send('not have BID in params');
    } else {
      const mitor = await Mitor.findOne({ _id: MID });
      if (mitor === null) {
        res.status(400).send('not found this mitor');
      } else {
        res.status(200).json(mitor);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
/**====================================================================================================================
 *====================================================================================================================
 * @param req
 * @param res
 */
const updateById = async (req: Request, res: Response) => {
  try {
    const MID = req.params.MID;
    const mitorRequest = req.body.mitor;

    /**
     * QUERY AND UPDTATE OBJECT SEARCH
     */
    const fillRequest = { _id: MID };
    const updateRequest = { $push: { MITOR: { ...mitorRequest } } };
    if (MID === null || mitorRequest === null) {
      res.status(400).send('not have BID and mitor body request');
    } else {
      const resultUpdate = await Mitor.findOneAndUpdate(
        fillRequest,
        updateRequest,
      );

      if (resultUpdate === null) {
        res.status(404).send('not found');
      } else {
        resultUpdate.save();
        res.status(200).json(resultUpdate);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
/**====================================================================================================================
 *====================================================================================================================
 * @param req
 * @param res
 */
const deleteById = async (req: Request, res: Response) => {};
/**====================================================================================================================
 *====================================================================================================================
 * @param req
 * @param res
 */
const deleteAll = async (req: Request, res: Response) => {
  try {
    const resultDelete = await Mitor.deleteMany({});

    res.status(200).json(resultDelete);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export default {
  readMany,
  readById,
  create,
  updateById,
  deleteById,
  deleteAll,
};

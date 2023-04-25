import { Request, Response } from 'express';
import { Suwan } from '../models/suwan';
import { Customer } from '../models/customer';
import { findRequiredRequest } from '../utils/findRequiredRequest';
import { removeSpaceString } from '../utils/removeSpaceString';

export const customerControll = () => {
  /**=================================================================================================================
   * =================================================== CREATE ======================================================
   *
   * @param req
   * @param res
   */
  const create = async (req: Request, res: Response) => {
    try {
      const customerDoc = new Customer();
      const customer = req.body.customer;

      if (customer === null || customer === undefined) {
        res.send(400).send('bad request');
      } else {
        const findFeild = findRequiredRequest(customer, [
          'FIRST_NAME',
          'LAST_NAME',
        ]);

        /**
         * this condition for fillter required request field
         */
        if (findFeild.length > 0) {
          res.status(400).json({
            msg: 'you request mistake',
            errorfield: findFeild,
            status: 400,
          });

          /**
           * when request field all state
           */
        } else {
          const { FIRST_NAME, LAST_NAME, CHAYA } = customer;

          // map data
          customerDoc.FIRST_NAME = removeSpaceString(FIRST_NAME);
          customerDoc.LAST_NAME = removeSpaceString(LAST_NAME);
          customerDoc.CHAJA = removeSpaceString(CHAYA);
          customerDoc.INTERNET = customer.INTERNET;
          customerDoc.PHONE = customer.PHONE;

          // save and respons
          const result = customerDoc.save();
          res.status(200).json({
            msg: 'save customer successfull',
            status: 200,
            result,
          });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  };

  /**=================================================================================================================
   * =================================================== READ ======================================================
   *
   * @param req
   * @param res
   */

  const readMany = async (req: Request, res: Response) => {
    try {
      const result = await Customer.find({});
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).send('had error at readAll controll');
    }
  };

  const readById = async (req: Request, res: Response) => {
    try {
      const CID = req.params.CID || {};
      if (CID === null) {
        res.status(400).send('have no CID');
      } else {
        const result = await Customer.find({ _id: CID });
        if (result === null) {
          res.status(404).send('not found this customer');
        } else {
          res.status(200).json(result);
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  };

  /**=================================================================================================================
   * =================================================== EDIT ======================================================
   *
   * @param req
   * @param res
   */
  const updateOne = async (req: Request, res: Response) => {
    try {
      const RID = req.params.RID || {};
      const customer = req.body.customer || {};

      if (RID === null || customer === null) {
        res.status(400).json({
          msg: 'not found id or customer data for findAnd Update',
        });
      } else {
        const result = await Customer.findOneAndUpdate(
          { _id: RID },
          { $set: { ...customer } },
        );

        /**
         *
         * fill null for result
         */
        if (result === null) {
          res.status(404).json({
            msg: 'not found',
            status: 404,
          });
        } else {
          result.save();
          res.status(200).json(result);
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  };

  /**=================================================================================================================
   * =================================================== DELETE ======================================================
   *
   * @param req
   * @param res
   */
  const deleteById = async (req: Request, res: Response) => {
    try {
      const CID = req.params.CID;

      const customer = await Customer.findOneAndDelete({ _id: CID });

      if (customer === null) {
        res.status(404).send('not found this feild');
      } else {
        customer.save();
        res.status(200).json(customer);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  };

  const deleteAll = async (req: Request, res: Response) => {
    try {
      const delAllcustomer = await Customer.deleteMany({});
      res.status(200).json(delAllcustomer);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  };

  /**
   * return { controllers }
   *
   *
   *
   *
   *
   *
   *
   *
   *
   */
  return {
    create,
    readMany,
    readById,
    updateOne,
    deleteAll,
    deleteById,
  };
};

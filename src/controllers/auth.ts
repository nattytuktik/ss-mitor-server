import { Request, Response } from 'express';
import Jwt from 'jsonwebtoken';
import bcypt from 'bcrypt';
import { AdminConfig } from '../models/config';

const token_key = 'TO$DVDAO49#';
const registor = async (req: Request, res: Response) => {
  try {
    const admin = new AdminConfig();
    const registorForm = req.body.user;
    const OldAdmin = await AdminConfig.findOne({
      USERNAME: registorForm.USERNAME,
    });

    if (OldAdmin !== null) {
      res.status(400).send('admin had record');
    } else {
      const passwordhash = await bcypt.hash(registorForm.PASSWORD, 10);

      admin.CAL_INTERNET = registorForm.CAL_INTERNET;
      admin.CAL_MITOR = registorForm.CAL_MITOR;
      admin.USERNAME = registorForm.USERNAME;
      admin.PASSWORD = passwordhash;

      const token = Jwt.sign(
        { AID: admin._id, username: admin.USERNAME },
        token_key,
        { expiresIn: '2m' },
      );
      admin.token = token;

      const result = await admin.save();

      res.status(200).send(result);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const loginForm = req.body.user || {};
    let token: string;
    if (loginForm === null) {
      res.status(400).send('bad reuest at LoginForm');
    } else {
      const admin = await AdminConfig.findOne({ USERNAME: loginForm.USERNAME });
      const comparePassword = await bcypt.compare(
        loginForm.PASSWORD,
        admin?.PASSWORD || '',
      );

      if (admin && comparePassword) {
        token = Jwt.sign(
          { AID: admin._id, username: admin.USERNAME },
          token_key,
          { expiresIn: '2m' },
        );
        res
          .status(200)
          .header({
            access_token: token,
          })
          .send('login successfull');
      } else {
        res.status(404).send('not found this username');
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export default {
  registor,
  login,
};

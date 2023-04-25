import { Router } from 'express';
import { customerControll } from '../controllers/customer';

const controll = customerControll();
const router = Router();

router.get('/', controll.readMany);

router.post('/', controll.create);

router.get('/CID', controll.readById);

router.put('/', controll.updateOne);

router.delete('/:RID', controll.deleteById);

router.delete('/', controll.deleteAll);

export const CustomerRouter = router;

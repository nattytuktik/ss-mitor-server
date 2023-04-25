import { Router } from 'express';
import mitor from '../controllers/mitor';
import { validMitor } from '../middlewares/validMitor';

const router = Router();

router.get('/', mitor.readMany);

router.put('/:MID', validMitor, mitor.updateById);

router.get('/:MID', mitor.readById);

router.delete('/', mitor.deleteAll);

export const MitorRouter = router;

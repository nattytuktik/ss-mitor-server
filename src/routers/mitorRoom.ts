import authToken from '../middlewares/authToken';
import { fillDateAndMitor } from '../middlewares/fillDateAndMitor';
import { hasRoomRecorded } from '../middlewares/hasRoomRecorded';
import { validMitor } from '../middlewares/validMitor';
import { validExRoom } from '../middlewares/validRoom';
import mitorRoom from './../controllers/mitorRoom';
import { Router } from 'express';

const router = Router();

router.post(
  '/',
  authToken,
  validExRoom,
  hasRoomRecorded,
  mitorRoom.createHandle,
);

router.get('/', authToken, mitorRoom.readMany);

router.get('/:RID', mitorRoom.readById);

router.put(
  '/:RID',
  authToken,
  fillDateAndMitor,
  validMitor,
  hasRoomRecorded,
  mitorRoom.editById,
);

router.delete('/:RID', authToken, mitorRoom.deleteById);

router.delete('/', authToken, mitorRoom.deleteAll);

export const MitorRoomRouter = router;

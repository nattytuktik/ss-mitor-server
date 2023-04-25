import { Router } from 'express';
import suwan from '../controllers/suwan';

const router = Router();

router.post('/');

router.get('/', suwan.readMany);

router.get('/SID');

router.put('/');

router.delete('/');

router.delete('/:SID');

export const SuwanRouter = router;

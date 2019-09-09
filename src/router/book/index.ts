import { Router } from 'express';
import * as controller from './controller';

const router = Router();

router.post('/add', controller.add);
router.get('/all', controller.all);
router.get('/search', controller.search);

export default router;

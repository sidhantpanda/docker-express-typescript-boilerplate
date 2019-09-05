import { Router } from 'express';
import * as controller from './controller';

const router = Router();

router.post('/add', controller.add);
router.post('/search', controller.search);

export default router;

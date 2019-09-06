import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import apiSpec from '../../../openapi.json';

const router = Router();

const options = {
  customCss: '.swagger-ui .topbar { display: none }'
};

router.use('/', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(apiSpec, options));

export default router;

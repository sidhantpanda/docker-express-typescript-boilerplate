import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import apiSpec from '../openapi.json';

import * as BookController from './controllers/book';

const swaggerUiOptions = {
  customCss: '.swagger-ui .topbar { display: none }'
};

const router = Router();

// Book routes
router.post('/book/add', BookController.add);
router.get('/book/all', BookController.all);
router.get('/book/search', BookController.search);
router.get('/book/id/:bookId', BookController.get);
router.delete('/book/id/:bookId', BookController.remove);

// Dev routes
if (process.env.NODE_ENV === 'development') {
  router.use('/dev/api-docs', swaggerUi.serve);
  router.get('/dev/api-docs', (req, res, next) => {
    const swaggerHost = `${req.protocol}://${req.headers.host}/`;
    const newSpec = { ...apiSpec };
    if (req.headers.host && req.protocol) {
      newSpec.servers.push({ url: swaggerHost });
    }
    swaggerUi.setup(newSpec, swaggerUiOptions)(req, res, next);
  });
}

export default router;

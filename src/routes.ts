import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

import * as BookController from './controllers/book';

const swaggerUiOptions = {
    customCss: '.swagger-ui .topbar { display: none }',
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
    router.use('/dev/api-docs', swaggerUi.serve as any);
    router.get(
        '/dev/api-docs',
        swaggerUi.setup(yaml.load(fs.readFileSync(path.join(__dirname, '../openapi.yml'), 'utf8')) as Object, swaggerUiOptions) as any
    );
}

export default router;

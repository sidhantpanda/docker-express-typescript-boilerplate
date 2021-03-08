/* eslint-disable import/first */
import dotenv from 'dotenv';

const result = dotenv.config();
if (result.error) {
  dotenv.config({ path: '.env.default' });
}

import util from 'util';
import app from './app';
import MongoConnection from './mongo-connection';
import logger from './logger';
import ConsoleLogger, { STYLES } from './lib/console-logger';

const consoleLogger = new ConsoleLogger();

let debugCallback = null;
if (process.env.NODE_ENV === 'development') {
  debugCallback = (collectionName: string, method: string, query: any, doc: string) => {
    const message = `${collectionName}.${method}(${util.inspect(query, { colors: true, depth: null })})`;
    consoleLogger.log(STYLES.VERBOSE, 'MONGO', message);
  };
}

const mongoConnection = new MongoConnection(process.env.MONGO_URL, debugCallback);

if (process.env.MONGO_URL == null) {
  logger.error('MONGO_URL not specified in environment');
  process.exit(1);
} else {
  mongoConnection.connect(() => {
    app.listen(app.get('port'), (): void => {
      logger.debug(`🌏 Express server started at http://localhost:${app.get('port')}`);
      // console.log('\x1b[36m%s\x1b[0m', // eslint-disable-line
      //   `🌏 Express server started at http://localhost:${app.get('port')}`);
      if (process.env.NODE_ENV === 'development') {
        logger.debug(`⚙️  Swagger UI hosted at http://localhost:${app.get('port')}/dev/api-docs`);
      }
    });
  });
}

// Close the Mongoose connection, when receiving SIGINT
process.on('SIGINT', () => {
  console.log('\n'); /* eslint-disable-line */
  logger.info('Gracefully shutting down');
  mongoConnection.close(err => {
    if (err) {
      logger.log({
        level: 'error',
        message: 'Error shutting closing mongo connection',
        error: err
      });
    } else {
      logger.info('Mongo connection closed successfully');
    }
    process.exit(0);
  });
});

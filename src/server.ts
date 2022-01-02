/* eslint-disable import/first */
import dotenv from 'dotenv';

const result = dotenv.config();
if (result.error) {
  dotenv.config({ path: '.env.default' });
}

import mongoose from 'mongoose';
import app from './app';
import logger from './logger';

const PORT = process.env.PORT || 3000;

const serve = () => app.listen(PORT, () => {
  logger.info(`🌏 Express server started at http://localhost:${PORT}`);

  if (process.env.NODE_ENV === 'development') {
    // This route is only present in development mode
    logger.info(
      `⚙️  Swagger UI hosted at http://localhost:${PORT}/dev/api-docs`
    );
  }
});

const startServer = async () => {
  if (process.env.MONGO_URL == null) {
    logger.error('MONGO_URL not specified in environment');
    process.exit(1);
  } else {
    try {
      await mongoose.connect(process.env.MONGO_URL);
      logger.info(`Connected to MongoDB at ${process.env.MONGO_URL}`);
      serve();
    } catch (error) {
      logger.log({
        level: 'error',
        message: 'Error starting the server',
        error
      });
      process.exit(1);
    }
  }
};

startServer();

// Close the Mongoose connection, when receiving SIGINT
process.on('SIGINT', async () => {
  console.log('\n'); /* eslint-disable-line */
  logger.info('Gracefully shutting down');
  logger.info('Closing the MongoDB connection');
  try {
    await mongoose.disconnect();
    logger.info('Mongo connection closed successfully');
  } catch (error) {
    logger.log({
      level: 'error',
      message: 'Error shutting closing mongo connection',
      error
    });
  }
  process.exit(0);
});

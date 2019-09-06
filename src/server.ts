require('dotenv').config();

import app from './app';
import MongoConnection from './mongo-connection';

const mongoConnection = new MongoConnection(process.env.MONGO_URL);

if (process.env.MONGO_URL == undefined) {
  const err = new Error('`MONGO_URL` not specified in .env file');
  console.error(err);
  process.exit(1);
  process.stdin.emit('SIGINT');
} else {
  mongoConnection.connect(() => {
    app.listen(app.get('port'), (): void => {
      console.log(`\n🌏 Express server started at http://localhost:${app.get('port')}`);
      if (process.env.NODE_ENV === 'development') {
        console.log(`⚙️  Swagger UI hosted at http://localhost:${app.get('port')}/dev/api-docs\n\n`);
      }
    });
  });
}

// Close the Mongoose connection, when receiving SIGINT
process.on('SIGINT', () => {
  console.log('\nGracefully shutting down');
  mongoConnection.close(err => {
    if (err) {
      console.error(err);
    }
    process.exit(0);
  });
});

import dotenv from 'dotenv';
const result = dotenv.config();
if (result.error) {
  dotenv.config({ path: '.env.default' });
}

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
    console.log(`\n\n*************************************************************************`);
    console.log(`*\t\t\t\t\t\t\t\t\t*`);
    console.log(`*\t🛢️  MongoDB running at ${process.env.MONGO_URL}\t\t*`);
    app.listen(app.get('port'), (): void => {
      console.log(`*\t🌏 Express server started at http://localhost:${app.get('port')}\t\t*`);
      if (process.env.NODE_ENV === 'development') {
        console.log(`*\t⚙️  Swagger UI hosted at http://localhost:${app.get('port')}/dev/api-docs\t*`);
      }
      console.log(`*\t\t\t\t\t\t\t\t\t*`);
      console.log(`*************************************************************************\n\n`);
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

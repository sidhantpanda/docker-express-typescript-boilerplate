import app from './app';
import MongoConnection from './mongo-connection';

const mongoConnection = new MongoConnection('mongodb://localhost:27018/relog');

mongoConnection.connect(() => {
  app.listen(app.get('port'), (): void => {
    console.log(`Express server started at http://localhost:${app.get('port')}`);
  });
});

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

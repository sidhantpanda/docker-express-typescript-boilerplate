import mongoose from 'mongoose';

/**
 * Mongoose Connection Helper
 * Connects to mongodb reliably with retries
 */
export default class MongoConnection {
  private mongoUrl: string;
  private onConnectedCallback: Function;
  private isConnectedBefore: boolean = false;

  /**
   * @param mongoUrl MongoDB connection url example: mongodb://localhost:27017/books
   */
  constructor(mongoUrl: string) {
    this.mongoUrl = mongoUrl;
    mongoose.connection.on('error', this.onError);
    mongoose.connection.on('disconnected', this.onDisconnected);
    mongoose.connection.on('connected', this.onConnected);
    mongoose.connection.on('reconnected', this.onReconnected);
  }

  /**
   * Close connection to MongoDB
   * @param onClosed `err` passed as first argument in callback if there was an error while disconnecting
   */
  public close(onClosed: (err: Error) => void) {
    console.log('Closing the MongoDB conection');
    mongoose.connection.close(onClosed);
  }

  /**
   * Attempt to connect to Mongo
   * @param onConnectedCallback Function to be called when connection is extablished
   */
  public connect(onConnectedCallback?: Function) {
    if (onConnectedCallback) {
      this.onConnectedCallback = onConnectedCallback;
    }
    mongoose.connect(this.mongoUrl, { useNewUrlParser: true }, () => { });
  }

  /**
   * `onConnected` callback for mongoose
   */
  private onConnected = () => {
    this.isConnectedBefore = true;
    this.onConnectedCallback();
  }

  /**
   * `onReconnected` callback for mongoose
   */
  private onReconnected = () => {
    console.log('Reconnected to MongoDB');
  }

  /**
   * `onError` callback for mongoose
   */
  private onError = () => {
    console.error(`Could not connect to MongoDB at ${this.mongoUrl}`);
  }

  /**
  * `onDisconnected` callback for mongoose
  */
  private onDisconnected = () => {
    if (!this.isConnectedBefore) {
      console.log('Retrying MongoDB connection');
      setTimeout(() => {
        this.connect();
      }, 2000);
    }
  }
}

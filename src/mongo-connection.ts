import mongoose from 'mongoose';

export default class MongoConnection {
  private mongoUrl: string;
  private onConnectedCallback: Function;
  private isConnectedBefore: boolean = false;

  /**
   * Start mongo connection
   * @param onConnected Function to be called when mongo connection is successful
   */
  constructor(mongoUrl: string) {
    this.mongoUrl = mongoUrl;
    mongoose.connection.on('error', this.onError);
    mongoose.connection.on('disconnected', this.onDisconnected);
    mongoose.connection.on('connected', this.onConnected);
    mongoose.connection.on('reconnected', this.onReconnected);
  }

  /**
   * 
   * @param onClosed 
   */
  public close(onClosed: (err: Error) => void) {
    console.log('Closing the MongoDB conection');
    mongoose.connection.close(onClosed);
  }

  public connect(onConnectedCallback?: Function) {
    if (onConnectedCallback) {
      this.onConnectedCallback = onConnectedCallback;
    }
    mongoose.connect(this.mongoUrl, { useNewUrlParser: true }, () => { });
  }

  private onConnected = () => {
    this.isConnectedBefore = true;
    this.onConnectedCallback();
  }

  private onReconnected = () => {
    console.log('Reconnected to MongoDB');
  }

  private onError = () => {
    console.error(`Could not connect to MongoDB at ${this.mongoUrl}`);
  }

  private onDisconnected = () => {
    if (!this.isConnectedBefore) {
      setTimeout(() => {
        console.log('Retrying MongoDB connection');
        this.connect();
      }, 2000);
    }
  }
}

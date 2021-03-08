import Transport from 'winston-transport';
import ConsoleLogger from './index';

export default class ConsoleLogTransport extends Transport {
  private logger = new ConsoleLogger();

  log(info: any, callback: { (): void }) {
    switch (info.level) {
      case 'error':
        this.logger.error(info.error || info.message);
        break;
      case 'warn':
        this.logger.warn(info.message);
        break;
      case 'info':
        this.logger.info(info.message);
        break;
      case 'verbose':
        this.logger.verbose(info.message);
        break;
      case 'debug':
        this.logger.debug(info.message);
        break;
      case 'silly':
        this.logger.silly(info.message);
        break;
      default:
    }
    callback();
  }
}

import chalk from 'chalk';
import Transport from 'winston-transport';
import ConsoleLogger, { STYLES } from './index';

const levelStyleMap: { [key: string]: chalk.Chalk } = {
  error: STYLES.ERROR,
  warn: STYLES.WARN,
  info: STYLES.INFO,
  verbose: STYLES.VERBOSE,
  debug: STYLES.DEBUG,
  silly: STYLES.SILLY
};

export default class ConsoleLogTransport extends Transport {
  private logger = new ConsoleLogger();

  log(info: any, callback: { (): void }) {
    const style = levelStyleMap[(info.level as string)];
    const label = info.consoleLoggerOptions?.label! || (info.level as string).toUpperCase();
    let { message } = info;
    if (info.error) {
      message = `${message} ${info.error.stack || info.error.message}`;
    }
    this.logger.log(style, label, message);
    callback();
  }
}

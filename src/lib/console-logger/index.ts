/* eslint-disable  */
import chalk from 'chalk';

const getTimeStampString = () => new Date(Date.now()).toISOString();

export const STYLES = {
  ERROR: chalk.bold.red,
  WARN: chalk.keyword('orange'),
  INFO: chalk.hex('#c4c64f'),
  VERBOSE: chalk.hex('#6435c9'),
  DEBUG: chalk.hex('#2185d0'),
  SILLY: chalk.hex('#f011ce')
}

export enum LABELS {
  ERROR = 'ERROR',
  WARN = 'WARN',
  INFO = 'INFO',
  VERBOSE = 'VERBOSE',
  DEBUG = 'DEBUG',
  SILLY = 'SILLY',
}

class ConsoleLogger {
  public log = (style: chalk.Chalk, label: LABELS | string, ...messages: any[]) => {
    const finalMessage = `[${getTimeStampString()}] [${label}]`
    console.log(style(finalMessage, ...(messages.map(item => {
      if (item.stack) {
        return '\n' + item.stack;
      } else if (item.message) {
        return item.message
      }
      return item;
    }))));
  }

  public error = (...messages: any[]) => this.log(STYLES.ERROR, LABELS.ERROR, ...messages);

  public warn = (...messages: any[]) => this.log(STYLES.WARN, LABELS.WARN, ...messages);

  public info = (...messages: any[]) => this.log(STYLES.INFO, LABELS.INFO, ...messages);

  public verbose = (...messages: any[]) => this.log(STYLES.VERBOSE, LABELS.VERBOSE, ...messages);

  public debug = (...messages: any[]) => this.log(STYLES.DEBUG, LABELS.DEBUG, ...messages);

  public silly = (...messages: any[]) => this.log(STYLES.SILLY, LABELS.SILLY, ...messages);
}

export default ConsoleLogger;
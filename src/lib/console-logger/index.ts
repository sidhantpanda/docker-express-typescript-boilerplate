/* eslint-disable  */
import chalk from 'chalk';

const getTimeStampString = () => new Date(Date.now()).toUTCString();

export const STYLES = {
  ERROR: chalk.bold.red,
  WARN: chalk.keyword('orange'),
  INFO: chalk.hex('#c4c64f'),
  VERBOSE: chalk.hex('#6435c9'),
  DEBUG: chalk.hex('#2185d0'),
  SILLY: chalk.hex('#21ba45')
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
  public log = (style: chalk.Chalk, label: LABELS | string, message: string) => {
    const finalMessage = `[${getTimeStampString()}] [${label}] ${message}`
    console.log(style(finalMessage));
  }

  public error = (error: string | Error) => {
    let finalMessage = '';
    if (typeof error === 'string') {
      // console.error(errorStyle(error));
      finalMessage = `${error}`;
    } else {
      if (error.stack) {
        finalMessage = `${error.stack}`;
      } else {
        finalMessage = `${error.message}`;
      }
    }
    return this.log(STYLES.ERROR, LABELS.ERROR, finalMessage);
  }

  public warn = (message: string) => this.log(STYLES.WARN, LABELS.WARN, message);

  public info = (message: string) => this.log(STYLES.INFO, LABELS.INFO, message);

  public verbose = (message: string) => this.log(STYLES.VERBOSE, LABELS.VERBOSE, message);

  public debug = (message: string) => this.log(STYLES.DEBUG, LABELS.DEBUG, message);

  public silly = (message: string) => this.log(STYLES.SILLY, LABELS.SILLY, message);
}

export default ConsoleLogger;
/* eslint-disable  */
import chalk from 'chalk';

const getTimeStampString = () => new Date(Date.now()).toUTCString();

const errorStyle = chalk.bold.red;
const warningStyle = chalk.keyword('orange');
const infoStyle = chalk.hex('#c4c64f');
const verboseStyle = chalk.hex('#6435c9');
const debugStyle = chalk.hex('#2185d0');
const sillyStyle = chalk.hex('#21ba45');

class ConsoleLogger {
  private log = (style: chalk.Chalk, message: string) => {
    console.log(style(message));
  }
  public error = (error: string | Error) => {
    let finalMessage = `[${getTimeStampString()}] [ERROR]`;
    if (typeof error === 'string') {
      // console.error(errorStyle(error));
      finalMessage = `${finalMessage} ${error}`;
    } else {
      if (error.stack) {
        finalMessage = `${finalMessage} ${error.stack}`;
      } else {
        finalMessage = `${finalMessage} ${error.message}`;
      }
    }
    return this.log(errorStyle, finalMessage);
  }

  public warn = (message: string) => {
    const finalMessage = `[${getTimeStampString()}] [WARN] ${message}`;
    this.log(warningStyle, message);
  }

  public info = (message: string) => {
    const finalMessage = `[${getTimeStampString()}] [INFO] ${message}`;
    this.log(infoStyle, finalMessage);
  }

  public verbose = (message: string) => {
    const finalMessage = `[${getTimeStampString()}] [VERBOSE] ${message}`;
    this.log(verboseStyle, finalMessage);
  }

  public debug = (message: string) => {
    const finalMessage = `[${getTimeStampString()}] [DEBUG] ${message}`;
    this.log(debugStyle, finalMessage);
  }

  public silly = (message: string) => {
    const finalMessage = `[${getTimeStampString()}] [SILLY] ${message}`;
    this.log(sillyStyle, finalMessage);
  }
}

export default ConsoleLogger;
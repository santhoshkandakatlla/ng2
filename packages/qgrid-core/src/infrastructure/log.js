/* eslint-disable  no-console*/
/* eslint-disable @typescript-eslint/no-unused-vars*/

export class Log {
  static info(source, message) {
    // console.info(`qgrid.${source}: ${message}`);
  }

  static warn(source, message) {
    // console.warn(`qgrid.${source}: ${message}`);
  }

  static error(source, message) {
    console.error(`qgrid.${source}: ${message}`);
  }
}

/* eslint-enable*/

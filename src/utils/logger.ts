import pino from 'pino';

const logger = pino({
  customLevels: {
    debug: 15,
    trace: 15,
    fatal: 6,
    error: 5,
    warn: 30,
    info: 20,
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  useOnlyCustomLevels: true,
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      singleLine: false, // Ensures the full object is printed in a readable format
      translateTime: true, // Adds a human-readable timestamp
      //   messageFormat: '{msg}', // Ensures the message is printed in a readable format
    },
  },
});

export { logger };

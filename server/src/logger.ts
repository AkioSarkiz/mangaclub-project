import winston, { createLogger } from 'winston';

const logger = createLogger({
  level: 'info',
  transports: [new winston.transports.Console()],
});

export { logger };

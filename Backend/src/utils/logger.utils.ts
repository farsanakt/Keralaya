import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize, json } = format;


const customFormat = printf(({ level, message, timestamp, ...metadata }) => {
    
  if (typeof message === 'object') {

    message = JSON.stringify(message)

  }

  return `${timestamp} [${level}]: ${message} ${Object.keys(metadata).length ? JSON.stringify(metadata) : ''}`

})


const logger = createLogger({
  level: 'info', 
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    json(),
    customFormat,
    colorize() 
  ),
  transports: [
    new transports.Console(), 
    new transports.File({ filename: 'app.log' }) 
  ],
});

export default logger;

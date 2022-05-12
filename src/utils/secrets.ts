import logger from './logger';
import dotenv from 'dotenv';

dotenv.config();

function throwIfUndefined(secret: string) {
  if (!process.env[secret]) {
    logger.error(`Please set ${secret} environment variable`);
    process.exit(1);
  }
  return secret;
}

export const PORT = throwIfUndefined('PORT');

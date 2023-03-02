import * as dotenv from 'dotenv' 
dotenv.config()
export default {
  // For development environment
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    dialect: "mysql",
  },
  // For production environment
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD_PROD,
    database: process.env.DB_NAME_PRODUCTION,
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT_PROD,
    logging: false,
    dialect: "mysql",
  },
};

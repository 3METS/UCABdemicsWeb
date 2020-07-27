require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 5000,
  cors: process.env.CORS,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT || '',
  email: process.env.EMAIL,
  emailPassword: process.env.EMAIL_PASSWORD,
  credentialPath: process.env.CREDENTIAL_PATH,
  jobTypes: process.env.JOB_TYPES ? process.env.JOB_TYPES.split(',') : [],
};

module.exports = { config };

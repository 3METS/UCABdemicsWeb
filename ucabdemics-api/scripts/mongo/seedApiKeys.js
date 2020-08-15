// DEBUG=app:* node scripts/mongo/seedApiKeys.js
const crypto = require('crypto');
const debug = require('debug')('app:scripts:api-keys');
const MongoLib = require('../../lib/db');

const adminScopes = [
  'signin:auth',
  'signup:auth',
  'read:contenido-programaticos',
  'create:contenido-programaticos',
  'update:contenido-programaticos',
  'delete:contenido-programaticos',
  'read:carreras',
  'create:carreras',
  'update:carreras',
  'delete:carreras',
  'read:competencias',
  'read:periodos-academico',
  'create:periodos-academico',
  'update:periodos-academico',
  'delete:periodos-academico',
  'read:plan-clases',
  'create:plan-clases',
  'delete:plan-clases',
  'read:profesores',
  'create:profesores',
  'update:profesores',
  'delete:profesores',
  'read:solicitudes',
  'create:solicitudes',
  'update:solicitudes',
  'delete:solicitudes',
  'read:usuarios',
  'create:usuarios',
  'update:usuarios',
  'delete:usuarios',
];

const publicScopes = [
  'signin:auth',
  'signup:auth',
  'read:contenido-programaticos',
  'read:carreras',
  'read:competencias',
  'read:periodos-academico',
  'read:plan-clases',
  'update:plan-clases',
  'create:plan-clases',
  'delete:plan-clases',
  'read:profesores',
  'create:profesores',
  'update:profesores',
  'read:solicitudes',
  'create:solicitudes',
  'update:solicitudes',
  'delete:solicitudes',
  'read:usuarios',
  'create:usuarios',
  'update:usuarios',
  'delete:usuarios',
];

const apiKeys = [
  {
    token: generateRandomToken(),
    scopes: adminScopes,
  },
  {
    token: generateRandomToken(),
    scopes: publicScopes,
  },
];

function generateRandomToken() {
  const buffer = crypto.randomBytes(32);
  return buffer.toString('hex');
}

async function seedApiKeys() {
  try {
    const mongoDB = new MongoLib();

    const promises = apiKeys.map(async (apiKey) => {
      await mongoDB.create('api-keys', apiKey);
    });

    await Promise.all(promises);
    debug(`${promises.length} api keys have been created succesfully`); // prettier-ignore
    return process.exit(0);
  } catch (error) {
    debug(error);
    process.exit(1);
  }
}

seedApiKeys();

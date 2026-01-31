const { MongoClient } = require('mongodb');

let database;

const initDb = (callback) => {
  if (database) {
    console.log('Database is already initialized');
    return callback(null, database);
  }

  const connectionString = process.env.MONGODB_URI;

  if (!connectionString) {
    return callback(new Error('MONGODB_URI not defined in environment variables'));
  }

  MongoClient.connect(connectionString)
    .then((client) => {
      database = client.db();
      console.log('MongoDB connected');
      callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!database) {
    throw Error('Database not initialized');
  }
  return database;
};

module.exports = {
  initDb,
  getDb
};

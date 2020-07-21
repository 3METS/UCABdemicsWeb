const MongoClient = require('mongodb').MongoClient;
const { config } = require('../config/index');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = encodeURIComponent(config.dbName);

const uri = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}?retryWrites=true&w=majority`;

class mongoFunction{
    constructor(){
        this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        this.dbName = DB_NAME;
    }

    connect() {
        if (!mongoFunction.connection) {
          mongoFunction.connection = new Promise((resolve, reject) => {
            this.client.connect((err) => {
              if (err){ 
                  console.log(err);
                  reject(err);
              }
              else{
                console.log('Connected successfuly');
                resolve(this.client.db(this.dbName));
              }
            });
          });
        }
        return mongoFunction.connection;
      }

    disconnect() {
      this.client.close();
      mongoFunction.connection = null;
    }

    getAll(collection, query) {
      return this.connect().then((db) => {
        return db.collection(collection).find(query).toArray();
      });
    }

    get(collection, query) {
      return this.connect().then((db) => {
        return db.collection(collection).findOne(query);
      });
    }

    create(collection, data) {
      return this.connect().then((db) => {
          return db.collection(collection).insertOne(data);
        })
        .then((result) => result.insertedId);
    }

    update(collection, query, data) {
      return this.connect().then((db) => {
          return db.collection(collection).updateOne(query, { $set: data }, { upsert: true });
        })
        .then((result) => result.upsertedId || id);
    }

    delete(collection, id) {
      return this.connect().then((db) => {
          return db.collection(collection).deleteOne({ _id: ObjectId(id) });
        })
        .then(() => id);
    }
}

module.exports = { mongoFunction };
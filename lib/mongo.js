import { MongoClient } from 'mongodb';

class Mongo {
    /*
  constructor(uri, database) {
    this.uri = uri;
    this.database = database;
  }
    */

  db = '';

  init = async (uri, database, connectionOptions) => {
    const client = new MongoClient(uri, connectionOptions);
    await client.connect();
    console.log(`Connected to Mongo @ ${uri}`);
    this.db = client.db(database);
    console.log(`Selected Mongo database named : ${database}`);
  }

  getDb = () => {
    return this.db;
  }
}

export const mongo = new Mongo();

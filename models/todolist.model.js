import { Constants } from '../lib/constants.js';
import { logger } from '../lib/logger.js';
import { mongo } from '../lib/mongo.js';

export class ToDoListModel {
  static getCollection() {
    const db = mongo.getDb();
    const collection = db.collection(Constants.TODOLIST_COLLECTIONS);

    collection.createIndex({ id: 1 }, { unique: true }).catch(console.error);

    return collection;
  }

  static getToDoLists() {
    logger.debug('ToDoListModel : getToDoLists()');
    return this.getCollection().find({}, {
      projection: { _id: 0 },
    });
  }

  static getToDoList(id) {
    logger.debug(`Model : getToDoList, id: ${id}`);
    return this.getCollection().findOne({ id }, {
      projection: { _id: 0 },
    });
  }

  static async createToDoList(toDoList) {
    logger.debug('Model : createToDoList');
    const collection = this.getCollection();
    await collection.insertOne(toDoList);
    delete toDoList._id;
    return toDoList;
  }

  static async updateToDoList(id, toDoList) {
    logger.debug(`Model : updateToDoList, id: ${id}`);
    const updateStatement = { $set: {} };

    Object.keys(toDoList).forEach((key) => {
      if (key === 'id') return;
      updateStatement.$set[key] = toDoList[key];
    });

    const collection = this.getCollection();
    const result = await collection.updateOne({ id }, updateStatement, { returnDocument: 'after' });
    delete result._id;
    return result;
  }

  static async replaceToDoList(id, toDoList) {
    logger.debug(`Model : replaceToDoList, id: ${id}`);
    const collection = this.getCollection();
    const result = await collection.replaceOne({ id }, toDoList);

    if (!result.modifiedCount) {
      return false;
    }
    delete result._id;
    return result;
  }

  static async deleteToDoList(id) {
    logger.debug(`Model : deleteToDoList, id: ${id}`);
    const collection = this.getCollection();
    const result = await collection.deleteOne({ id });

    return result.deletedCount > 0;
  }
}

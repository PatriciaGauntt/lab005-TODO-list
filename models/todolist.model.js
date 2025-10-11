import { Constants } from '../lib/constants.js';
import { logger } from '../lib/logger.js';
import { mongo } from '../lib/mongo.js';

export class ToDoListModel {
  static getToDoLists() {
    logger.debug('ToDoListModel : getToDoLists()');
    return mongo.getDb().collection(Constants.TODOLIST_COLLECTIONS).find({}, {
      projection: {
        _id: 0,
      },
    });
  }

  static getToDoList(id) {
    logger.debug(`Model : getToDoList, id: ${id}`);
    return mongo.getDb().collection(Constants.TODOLIST_COLLECTIONS).findOne({ id }, {
      projection: {
        _id: 0,
      },
    });
  }

  static async createToDoList(toDoList) {
    logger.debug('Model : createToDoList');
    await mongo.getDb().collection(Constants.TODOLIST_COLLECTIONS).insertOne(toDoList);
    delete toDoList._id;
    return toDoList;
  }

  static async updateToDoList(id, toDoList) {
    logger.debug(`Model : updateToDoList, id: ${id}`);
    const updateStatement = {
      $set: {},
    };

    Object.keys(toDoList).forEach((key) => {
      if (key === 'id') {
        return;
      }
      updateStatement.$set[key] = toDoList[key];
    });
    const result = await mongo.getDb().collection(Constants.TODOLIST_COLLECTIONS).updateOne(
      { id },
      updateStatement,
      { returnDocument: 'after' },
    );

    delete result._id;
    return result;
  }

  static async replaceToDoList(id, toDoList) {
    logger.debug(`Model : replaceToDoList, id: ${id}`);
    const result = await mongo.getDb().collection(Constants.TODOLIST_COLLECTIONS)
      .replaceOne({ id }, toDoList);

    if (!result.modifiedCount) {
      return false;
    }
    delete result._id;
    return result;
  }

  static async deleteToDoList(id) {
    logger.debug(`Model : deleteToDoList, id: ${id}`);
    const result = await mongo.getDb().collection(Constants.TODOLIST_COLLECTIONS).deleteOne(
      { id },
    );
    if (result.deletedCount) {
      return true;
    }
    return false;
  }
}

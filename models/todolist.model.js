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
    );
    if (result.matchedCount) {
      return true;
    }
    return false;
  }

  static replaceToDoList(id, toDoList) {
    logger.debug(`Model : replaceToDoList, id: ${id}`);
    const idx = data.findIndex(toDoList => toDoList.id === id);
    if (idx < 0) {
      return false;
    }
    data.splice(idx, 1);
    data.push(toDoList);
    return toDoList;
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

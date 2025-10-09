import { Constants } from '../lib/constants.js';
import { mongo } from '../lib/mongo.js';

const data = [
  {
    id: 'abc',
    item: 'do homework',
    color: 'red',
  },
  {
    id: 'bcd',
    item: 'pay water bill',
    color: 'blue',
  },
  {
    id: 'cde',
    item: 'buy milk',
    color: 'green',
  },
];

export class ToDoListModel {
  static getToDoLists() {
    console.log('ToDoListModel : getToDoLists()');
    return mongo.getDb().collection(Constants.TODOLIST_COLLECTIONS).find({}, {
      projection: {
        _id: 0,
      },
    });
  }

  static getToDoList(id) {
    console.log(`Model : getToDoList, id: ${id}`);
    return mongo.getDb().collection(Constants.TODOLIST_COLLECTIONS).findOne({ id }, {
      projection: {
        _id: 0,
      },
    });
  }

  static async createToDoList(toDoList) {
    console.log('Model : createToDoList');
    await mongo.getDb().collection(Constants.TODOLIST_COLLECTIONS).insertOne(toDoList);
    delete toDoList._id;
    return toDoList;
  }

  static async updateToDoList(id, toDoList) {
    console.log(`Model : updateToDoList, id: ${id}`);
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
    console.log(`Model : replaceToDoList, id: ${id}`);
    const idx = data.findIndex(toDoList => toDoList.id === id);
    if (idx < 0) {
      return false;
    }
    data.splice(idx, 1);
    data.push(toDoList);
    return toDoList;
  }

  static async deleteToDoList(id) {
    console.log(`Model : deleteToDoList, id: ${id}`);
    const result = await mongo.getDb().collection(Constants.TODOLIST_COLLECTIONS).deleteOne(
      { id },
    );
    if (result.deletedCount) {
      return true;
    }
    return false;
  }
}

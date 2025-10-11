import AJV from 'ajv';
import addFormats from 'ajv-formats';
import { v4 as uuid } from 'uuid';

import { logger } from '../lib/logger.js';
import { ToDoListModel } from '../models/todolist.model.js';
import toDoListSchema from '../schemas/todolist.json' with { type: 'json' };

const ajv = new AJV();
addFormats(ajv);
const validate = ajv.compile(toDoListSchema);

export class ToDoListService {
  static getToDoLists() {
    logger.debug('Service : getToDoLists');
    return ToDoListModel.getToDoLists();
  }

  static getToDoList(id) {
    logger.debug(`Service : getToDoList, id: ${id}`);
    return ToDoListModel.getToDoList(id);
  }

  static createToDoList(toDoList) {
    const newToDoList = {
      ...toDoList,
      id: uuid().slice(0, 5),
      tracking: {
        uuid: uuid(),
        createdDate: new Date(),
      }
    };

    const valid = validate(newToDoList);
    if (!valid) {
      logger.warn('Validation error on creating a new TO DO Item!', validate.errors);
      throw validate.errors;
    }

    logger.debug('Service : createToDoList');
    return ToDoListModel.createToDoList(newToDoList);
  }

  static async updateToDoList(id, toDoList) {
    const existingToDoList = await ToDoListModel.getToDoList(id);

    if (!existingToDoList) {
      throw new Error(`To Do Item with ${id} not found`);
    }

    const updateToDoList = {
      ...existingToDoList,
      ...toDoList,
      id,
      tracking: {
        ...existingToDoList.tracking,
        updatedDate: new Date(),
      },
    };

    const valid = validate(updateToDoList);
    if (!valid) {
      logger.warn('Validation error on updating a TO DO Item!', validate.errors);
      throw validate.errors;
    }

    logger.debug(`Service : updateToDoList, id: ${id}`);
    return ToDoListModel.updateToDoList(id, updateToDoList);
  }

  static async replaceToDoList(id, toDoList) {
    const existingToDoList = await ToDoListModel.getToDoList(id);

    if (!existingToDoList) {
      throw new Error(`To Do Item with ${id} not found`);
    }

    const replaceToDoList = {
      ...existingToDoList,
      ...toDoList,
      id,
      tracking: {
        ...existingToDoList.tracking,
        updatedDate: new Date(),
      }
    };

      const valid = validate(replaceToDoList);
      if (!valid) {
        logger.warn('Validation error on replacing a TO DO Item!', validate.errors);
      throw validate.errors;
    }

    logger.debug(`Service : replaceToDoList, id: ${id}`);
    return ToDoListModel.replaceToDoList(id, replaceToDoList);
  }

  static deleteToDoList(id) {
    logger.debug(`Service : deleteToDoList, id: ${id}`);
    return ToDoListModel.deleteToDoList(id);
  }
}

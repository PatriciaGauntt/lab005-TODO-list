import { logger} from '../lib/logger.js';
import { ToDoListService } from '../services/todolist.service.js';

export class ToDoListController {
  static async getToDoLists(req, res, next) {
    logger.debug('Controller : getToDoLists');
    const resultCursor = await ToDoListService.getToDoLists();
    res.status(200).json(await resultCursor.toArray());
  }

  static async getToDoList(req, res) {
    logger.debug(`Controller : getToDoList, id: ${req.params.id}`);
    const result = await ToDoListService.getToDoList(req.params.id);
    if (!result) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json(result);
  }

  static async createToDoList(req, res, next) {
    try {
      logger.debug('Controller : createToDoList');
      const result = await ToDoListService.createToDoList(req.body);
      res.status(201).json(result);
    } catch (err) {
      logger.error(err.message);
      res.status(err.statusCode || 500).json({
        error: err.message,
      });
    }
  }

  static async updateToDoList(req, res) {
    try {
      logger.debug(`Controller: updateToDoList, id: ${req.params.id}`);
      const result = await ToDoListService.updateToDoList(req.params.id, req.body);
      res.status(200).json(result);
    } catch (err) {
      logger.error(err.message);
      res.status(err.statusCode || 500).json({
        error: err.message,
      });
    }
  }

  static async replaceToDoList(req, res) {
    try {
      logger.debug(`Controller : replaceToDoList, id: ${req.params.id}`);
      const result = await ToDoListService.replaceToDoList(req.params.id, req.body);
      if (!result) {
        res.sendStatus(404);
        return;
      }
      res.status(200).json(result);
    } catch (err) {
      logger.error(`Error replacing ToDo item: ${err.message}`);
      res.status(err.statusCode || 500).json({
        error: err.message,
        ...(err.details && { details: err.details })
      });
    }
  }

  static async deleteToDoList(req, res) {
    logger.debug(`Controller : deleteToDoList, id: ${req.params.id}`);
    const result = await ToDoListService.deleteToDoList(req.params.id);
    if (result) {
      res.sendStatus(204);
      return;
    }
    res.sendStatus(404);
  }
}

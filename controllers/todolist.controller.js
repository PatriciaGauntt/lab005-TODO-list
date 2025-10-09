import { ToDoListService } from '../services/todolist.service.js';

export class ToDoListController {
  static async getToDoLists(req, res, next) {
    console.log('Controller : getToDoLists');
    const resultCursor = await ToDoListService.getToDoLists();
    res.status(200).json(await resultCursor.toArray());
  }

  static async getToDoList(req, res) {
    console.log(`Controller : getToDoList, id: ${req.params.id}`);
    const result = await ToDoListService.getToDoList(req.params.id);
    if (!result) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json(result);
  }

  static async createToDoList(req, res) {
    console.log('Controller : createToDoLists');
    const result = await ToDoListService.createToDoList(req.body);
    res.status(201).json(result);
  }

  static async updateToDoList(req, res) {
    console.log(`Controller: updateToDoList, id: ${req.params.id}`);
    const result = await ToDoListService.updateToDoList(req.params.id, req.body);
    if (result) {
      res.status(200).json(result);
      return;
    }
    res.sendStatus(404);
  }

  static async replaceToDoList(req, res) {
    console.log(`Controller : replaceToDoList, id: ${req.params.id}`);
    const result = await ToDoListService.replaceToDoList(req.params.id, req.body);
    if (!result) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json(result);
  }

  static async deleteToDoList(req, res) {
    console.log(`Controller : deleteToDoList, id: ${req.params.id}`);
    const result = await ToDoListService.deleteToDoList(req.params.id);
    if (result) {
      res.sendStatus(204);
      return;
    }
    res.sendStatus(404);
  }
}

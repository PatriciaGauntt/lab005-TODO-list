import express from 'express';

import { ToDoListController } from '../controllers/todolist.controller.js';

export const toDoListRouter = express.Router();

toDoListRouter.get('/', ToDoListController.getToDoLists);
toDoListRouter.get('/:id', ToDoListController.getToDoList);
toDoListRouter.post('/', ToDoListController.createToDoList);
toDoListRouter.put('/:id', ToDoListController.replaceToDoList);
toDoListRouter.patch('/:id', ToDoListController.updateToDoList);
toDoListRouter.delete('/:id', ToDoListController.deleteToDoList);


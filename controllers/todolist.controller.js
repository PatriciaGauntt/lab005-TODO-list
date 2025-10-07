import { ToDoListService } from '../services/todolist.service.js'
export class ToDoListController {
    static getToDoLists(req, res, next) {
        console.log('Controller : getToDoLists');
        const result = ToDoListService.getToDoLists();
        res.status(200).json(result);
    }
    static getToDoList = (req, res) => {
        console.log(`Controller : getToDoList, id: ${req.params.id}`);
        const result = ToDoListService.getToDoList(req.params.id);
        if (!result) {
            res.sendStatus(404);
            return;
    }
        res.status(200).json(result);
    }
    static createToDoList = (req, res) => {
        console.log('Controller : createToDoLists');
        const result = ToDoListService.createToDoList(req.body);
        res.status(201).json({result});
    };
    static updateToDoList = (req, res) => {
        console.log(`Controller : updateToDoList, id: ${req.params.id}`);
        const result = ToDoListService.updateToDoList(req.params.id, req.body);
        if (result) {
            res.status(200).json(result);
            return;
        }
        res.sendStatus(404);
    }
    static replaceToDoList = (req, res) => {
        console.log(`Controller : replaceToDoList, id: ${req.params.id}`);
        const result = ToDoListService.replaceToDoList(req.params.id, req.body);
        if (!result) {
            res.sendStatus(404);
            return;
        }
        res.status(200).json(result);
    }
    static deleteToDoList = (req, res) => {
        console.log(`Controller : deleteToDoList, id: ${req.params.id}`);
        const result = ToDoListService.deleteToDoList(req.params.id);
        res.sendStatus(204);
    }
}

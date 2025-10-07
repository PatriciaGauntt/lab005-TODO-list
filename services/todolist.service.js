import { v4 as uuid } from 'uuid';

import { ToDoListModel } from "../models/todolist.model.js";

export class ToDoListService {
    static getToDoLists() {
        console.log('Service : getToDoLists');
        return ToDoListModel.getToDoLists();
    }
    static getToDoList(id) {
        console.log(`Service : getToDoList, id: ${id}`);
        return ToDoListModel.getToDoList(id);
    }
    static createToDoList(toDoList) {
            const newToDoList = {
              ...toDoList,
              id: uuid().slice(0,5),
              dateAdded: new Date().toISOString(),
            };
        console.log('Service : createToDoLists');
        return ToDoListModel.createToDoList(newToDoList);
    }
    static updateToDoList(id, toDoList) {
        const updateToDoList = {
            ...toDoList,
            id,
            dateUpdated: new Date().toISOString(),
        };
        console.log(`Service : updateToDoList, id: ${id}`);
        return ToDoListModel.updateToDoList(id, updateToDoList);
    }
    static replaceToDoList = (id, toDoList) => {
        const replaceToDoList = {
            ...toDoList,
            id,
            dateUpdated: new Date().toISOString(),
        };
        console.log(`Service : replaceToDoList, id: ${id}`);
        return ToDoListModel.replaceToDoList(id, replaceToDoList);
    }
    static deleteToDoList = (id) => {
        console.log(`Service : deleteToDoList, id: ${id}`);
        return ToDoListModel.deleteToDoList(id);
    }
}
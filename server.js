import express from 'express';
import { ToDoListController } from './controllers/todolist.controller.js'
const app = express();
const port = 3000;

app.use(express.json());

app.get('/api/v1/toDoLists', ToDoListController.getToDoLists);
app.get('/api/v1/toDoLists/:id', ToDoListController.getToDoList);
app.post('/api/v1/toDoLists', ToDoListController.createToDoList);
app.put('/api/v1/toDoLists/:id', ToDoListController.replaceToDoList);
app.patch('/api/v1/toDoLists/:id', ToDoListController.updateToDoList);
app.delete('/api/v1/toDoLists/:id', ToDoListController.deleteToDoList);

app.listen(port, () => {
    console.log(`TODO List API listening at http://localhost:${port}`);
});
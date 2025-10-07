import express from 'express';

import { toDoListRouter } from './routes/todolist.routes.js';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/v1/toDoLists', toDoListRouter);

app.listen(port, () => {
  console.log(`TODO List API listening at http://localhost:${port}`);
});

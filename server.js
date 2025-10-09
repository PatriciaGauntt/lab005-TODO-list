import express from 'express';

import { Constants } from './lib/constants.js';
import { mongo } from './lib/mongo.js';
import { errorHandler } from './middleware/error.middleware.js';
import { hexcolorAssign } from './middleware/hexcolor-assign.middleware.js';
import { toDoListRouter } from './routes/todolist.routes.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api/v1/toDoLists', hexcolorAssign);

app.use('/api/v1/toDoLists', toDoListRouter);

app.use(errorHandler);
const mongoOptions = {
  appName: 'ToDoListAPI',
  minPoolSize: 2,
  maxPoolSize: 10,
};


await mongo.init(Constants.MONGO_URI, Constants.DATABASE, mongoOptions);
const result = await mongo.getDb().collection(Constants.TODOLIST_COLLECTIONS).findOne();
console.log(result);


app.listen(port, () => {
  console.log(`TODO List API listening at http://localhost:${port}`);
});

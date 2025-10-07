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
        console.log('Model : getToDoLists');
        return data;
    }
    static getToDoList(id) {
        console.log(`Model : getToDoList, id: ${id}`);
        return data.find((toDoList) => toDoList.id === id);
    }
    static createToDoList(toDoList) {
        console.log('Model : createToDoList');
        data.push(toDoList);
        return toDoList;
    }
    static updateToDoList(id, toDoList) {
        console.log(`Model : updateToDoList, id: ${id}`);
        const idx = data.findIndex((toDoList) => toDoList.id === id);
        if (idx < 0) {
            return false;
    }
    Object.keys(toDoList).forEach((key) => {
      if (key === 'id') {
        return;
      }
      data[idx][key] = toDoList[key];
    });

    return data[idx];
  }

    static replaceToDoList = (id, toDoList) => {
        console.log(`Model : replaceToDoList, id: ${id}`);
        const idx = data.findIndex(toDoList => toDoList.id === id);
      if (idx < 0) {
      return false;
      }
        data.splice(idx, 1);
        data.push(toDoList);
        return toDoList;
    }
    static deleteToDoList(id) {
        console.log(`Model : deleteToDoList, id: ${id}`);
        const idx = data.findIndex(toDoList => toDoList.id === id);
        if (idx === -1) {
            return true;
        }
        data.splice(idx, 1);
        return true;
    }
}

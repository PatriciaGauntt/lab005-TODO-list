import { jest } from '@jest/globals';
import { logger } from '../lib/logger.js';

await jest.unstable_mockModule('../models/todolist.model.js', () => ({
  ToDoListModel: {
    getToDoLists: jest.fn(),
    getToDoList: jest.fn(),
    createToDoList: jest.fn(),
    updateToDoList: jest.fn(),
    replaceToDoList: jest.fn(),
    deleteToDoList: jest.fn(),
  },
}));

await jest.unstable_mockModule('../lib/logger.js', () => ({
  logger: {
    debug: jest.fn(),
    warn: jest.fn(),
  },
}));

const { ToDoListModel } = await import('../models/todolist.model.js');
const { ToDoListService } = await import('../services/todolist.service.js');

describe('ToDoListService', () => {
  describe('createToDoList', () => {
it('creates a new todo with valid data', async () => {
  const mockToDo = { item: 'Test', color: 'blue', hexcolorAssign: '#0000ff' };
  const createdToDo = {
    ...mockToDo,
    id: 'abc12',
    tracking: { uuid: 'mock-uuid', createdDate: '2025-10-11T00:00:00.000Z' },
  };

  ToDoListModel.createToDoList.mockResolvedValue(createdToDo);

  const result = await ToDoListService.createToDoList(mockToDo);

  expect(ToDoListModel.createToDoList).toHaveBeenCalledTimes(1);
  expect(result.item).toBe('Test');
  expect(result).toHaveProperty('tracking');
  expect(result.tracking).toHaveProperty('uuid');
});
  });
});
describe('updateToDoList', () => {
  it('updates a todo successfully', async () => {
    const mockId = 'abc12';
    const existing = {
      id: mockId,
      item: 'Old Item',
      color: 'blue',
      hexcolorAssign: '#0000ff',
      tracking: { uuid: '123e4567-e89b-12d3-a456-426614174000', createdDate: '2025-10-10T00:00:00.000Z' }
    };

    const updatedInput = { item: 'Updated Item' };
    const updatedOutput = {
      ...existing,
      ...updatedInput,
      tracking: { ...existing.tracking, updatedDate: new Date().toISOString() }
    };

    ToDoListModel.getToDoList.mockResolvedValue(existing);
    ToDoListModel.updateToDoList.mockResolvedValue(updatedOutput);

    const result = await ToDoListService.updateToDoList(mockId, updatedInput);

    expect(ToDoListModel.getToDoList).toHaveBeenCalledWith(mockId);
    expect(ToDoListModel.updateToDoList).toHaveBeenCalledWith(mockId, expect.any(Object));
    expect(result.item).toBe('Updated Item');
    expect(result.tracking).toHaveProperty('updatedDate');
  });

  it('throws an error if item is empty', async () => {
    await expect(ToDoListService.updateToDoList('abc12', { item: '   ' }))
      .rejects.toThrow('The "item" field cannot be empty or just spaces.');
  });

  it('throws an error if todo not found', async () => {
    ToDoListModel.getToDoList.mockResolvedValue(null);

    await expect(ToDoListService.updateToDoList('xyz99', { item: 'New item' }))
      .rejects.toThrow('To Do Item with xyz99 not found');
  });
});

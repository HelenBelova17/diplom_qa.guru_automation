import { test } from '@playwright/test';

export class TodosController {
    constructor(api) {
        this.api = api;
    }

    async getAllTodos() {
        return await test.step('Получить список всех задач GET /todos', async () => {
            return await this.api.get('/todos');
        });
    }

    async getTodoById(todoId) {
        return await test.step(`Получить задачу по id GET /todos/${todoId}`, async () => {
            return await this.api.get(`/todos/${todoId}`);
        });
    }

    async getDoneTodos() {
        return await test.step('Получить выполненные задачи GET /todos?doneStatus=true', async () => {
            return await this.api.get('/todos?doneStatus=true');
        });
    }

    async postTodo(todo) {
        return await test.step(`Создать задачу POST /todos "${todo.title}"`, async () => {
            const payload = {
                title: `${todo.title}`,
                doneStatus: Boolean(todo.doneStatus),
                description: `${todo.description}`,
            };
            return await this.api.post('/todos', payload);
        });
    }

    async postTodoById(todo) {
        return await test.step(`Обновить описание задачи POST /todos/${todo.id}`, async () => {
            const payload = {
                description: `${todo.description}`,
            };
            return await this.api.post(`/todos/${todo.id}`, payload);
        });
    }

    async putTodo(todo) {
        return await test.step(`Обновить задачу PUT /todos/${todo.id}`, async () => {
            const payload = {
                id: Number(todo.id),
                title: `${todo.title}`,
                doneStatus: Boolean(todo.doneStatus),
                description: `${todo.description}`,
            };
            return await this.api.put(`/todos/${todo.id}`, payload);
        });
    }

    async deleteTodosById(todoId) {
        return await test.step(`Удалить задачу DELETE /todos/${todoId}`, async () => {
            return await this.api.delete(`/todos/${todoId}`);
        });
    }
}

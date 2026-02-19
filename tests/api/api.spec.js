import { expect } from '@playwright/test';
import { test } from '../../src/helpers/fixtures/api.fixtures';
import { ChallengesApi, ChallengesController } from '../../src/controllers/index';
import { TodoBuilder } from '../../src/helpers/builders';

test.describe.serial('API-тесты для работы с задачами', () => {
    let createdToDoId;

    test('Получить токен авторизации GET /challenger (200)',
        { tag: '@get' },
        async ({ apiBaseURL }) => {
            const api = new ChallengesApi(apiBaseURL);
            const challengesController = new ChallengesController(api);
            const response = await challengesController.createChallenger();

            expect(response.status).toBe(201);
            expect(response.headers.get('x-challenger')).toEqual(expect.any(String));
        });

    test('Создать новую задачу POST /todos (201)',
        { tag: '@post' },
        async ({ todosController }) => {
            const newTodo = new TodoBuilder().addTitle().addDoneStatus(true).addDescription().generate();
            const response = await todosController.postTodo(newTodo);
            const todo = await response.json();

            createdToDoId = todo.id;

            expect(response.status).toBe(201);
            expect(newTodo.title).toBe(todo.title);
            expect(newTodo.doneStatus).toBe(todo.doneStatus);
            expect(newTodo.description).toBe(todo.description);
        });

    test('Получить список задач GET /todos (200)',
        { tag: '@get' },
        async ({ todosController }) => {
            const response = await todosController.getAllTodos();
            const body = (await response.json()).todos;

            expect(response.status).toBe(200);
            expect(Array.isArray(body)).toBe(true);
        });

    test('Получить задачу по id GET /todos/{id} (200)',
        { tag: '@get' },
        async ({ todosController }) => {
            const response = await todosController.getTodoById(createdToDoId);
            const responseBody = await response.json();
            const id = responseBody.todos[0].id;

            expect(response.status).toBe(200);
            expect(id).toBe(createdToDoId);
        });

    test('Отфильтровать задачу по статусу GET /todos (200) ?filter',
        { tag: '@get' },
        async ({ todosController }) => {
            const response = await todosController.getDoneTodos();
            const responseBody = await response.json();

            expect(response.status).toBe(200);
            responseBody.todos.forEach((el) => expect(el.doneStatus).toBe(true));
        });

    test('Обновить описание задачи по id POST /todos/{id} (200)',
        { tag: '@post' },
        async ({ todosController }) => {
            const newTodoWithDescription = new TodoBuilder().addId(createdToDoId).addDescription().generate();
            const response = await todosController.postTodoById(newTodoWithDescription);
            const responseBody = await response.json();

            expect(response.status).toBe(200);
            expect(responseBody.description).toBe(newTodoWithDescription.description);
        });

    test('Обновить все поля задачи PUT /todos/{id} full (200)',
        { tag: '@put' },
        async ({ todosController }) => {
            const newTodoContent = new TodoBuilder().addId(createdToDoId).addTitle().addDoneStatus(true).addDescription().generate();
            const response = await todosController.putTodo(newTodoContent);
            const responseBody = await response.json();

            expect(response.status).toBe(200);
            expect(responseBody.title).toBe(newTodoContent.title);
            expect(responseBody.doneStatus).toBe(newTodoContent.doneStatus);
            expect(responseBody.description).toBe(newTodoContent.description);
        });

    test('Удалить задачу по id DELETE /todos/{id} (200)',
        { tag: '@delete' },
        async ({ todosController }) => {
            const response = await todosController.deleteTodosById(createdToDoId);
            expect(response.status).toBe(200);
        });
});
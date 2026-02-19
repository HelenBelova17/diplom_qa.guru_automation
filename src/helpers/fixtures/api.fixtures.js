import { test as base } from '@playwright/test';
import { ChallengesApi, ChallengesController, TodosController } from '../../controllers/index';

export const test = base.extend({
    apiBaseURL: [async ({}, use) => {
        await use(process.env.API_BASE_URL);
    }, { scope: 'worker' }],

    todosController: [async ({ apiBaseURL }, use) => {
        const api = new ChallengesApi(apiBaseURL);
        const challengesController = new ChallengesController(api);
        const todosController = new TodosController(api);

        await challengesController.createChallenger();

        await use(todosController);
    }, { scope: 'worker' }],
});
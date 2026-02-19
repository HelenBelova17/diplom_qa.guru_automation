import { test } from '@playwright/test';

export class ChallengesController {
    constructor(api) {
        this.api = api;
    }

    async createChallenger() {
        return await test.step('Получить токен авторизации POST /challenger', async () => {
            return await this.api.auth('/challenger');
        });
    }
}

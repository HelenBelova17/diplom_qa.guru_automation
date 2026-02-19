import { test } from '@playwright/test';

export class LoginPage {
    constructor(page) {
        this.page = page;

        this.emailField = page.getByPlaceholder('Email');
        this.passwordField = page.getByPlaceholder('Password');

        this.signinButton = page.getByRole('button', { name: 'Login' });
    }

    async login(email, password) {
        await test.step('Войти в аккаунт', async () => {
            await this.emailField.fill(email);
            await this.passwordField.fill(password);
            await this.signinButton.click();
        });
    }

    async open(url) {
        await test.step(`Открыть страницу ${url}`, async () => {
            await this.page.goto(url);
        });
    }
}

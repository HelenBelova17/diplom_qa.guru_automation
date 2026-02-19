import { test } from '@playwright/test';

export class SettingsPage {
    constructor(page) {
        this.passwordField = page.getByPlaceholder('Password');
        this.usernameField = page.getByPlaceholder('Your Name');
        this.updateSettingsButton = page.getByRole('button', { name: 'Update Settings' });
    }

    async updatePassword(newPassword) {
        await test.step('Обновить пароль', async () => {
            await this.passwordField.fill(newPassword);
            await this.updateSettingsButton.click();
        });
    }

    async updateUsernameAndSave(username) {
        await test.step('Обновить имя пользователя', async () => {
            await this.usernameField.fill(username);
            await this.updateSettingsButton.click();
        });
    }
}

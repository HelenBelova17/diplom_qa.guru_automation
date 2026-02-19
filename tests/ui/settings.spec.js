import { expect } from '@playwright/test';
import { test } from '../../src/helpers/fixtures/ui.fixtures';
import { UserBuilder } from '../../src/helpers/builders';

test.describe('Настройки', () => {

    test('Зарегистрировать нового пользователя', async ({ webApp }) => {
        const user = new UserBuilder().addUsername().addEmail().addPassword().generate();

        await webApp.main.gotoRegister();
        await webApp.register.register(user.username, user.email, user.password);
        await expect(webApp.main.dropownMenu).toHaveText(user.username);
    });

    test('Сменить пароль пользователя', async ({ webApp, user }) => {
        const newPassword = new UserBuilder().addPassword(10).generate();

        await webApp.main.gotoSettings();
        await webApp.settings.updatePassword(newPassword.password);
        await expect(webApp.settings.updateSettingsButton).toBeHidden();

        await webApp.main.gotoLogOut();
        await webApp.main.gotoLogin();
        await webApp.login.login(user.email, newPassword.password);
    });

    test('Изменить имя пользователя', async ({ webApp, user }) => {
        const userInfo = new UserBuilder().addUsername().generate();

        await webApp.main.gotoSettings();
        await webApp.settings.updateUsernameAndSave(userInfo.username);

        await expect(webApp.settings.updateSettingsButton).toBeHidden();
        expect(await webApp.settings.usernameField.inputValue()).toBe(userInfo.username);
    });
});
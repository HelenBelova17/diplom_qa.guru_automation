import { test } from '@playwright/test';
import { replaceSpecificSymbolsForLink } from '../helpers/utils/replacements';

export class ArticlePage {
    constructor(page) {
        this.page = page;

        this.articleTitle = page.locator('div.container h1');
        this.articleContent = page.locator('div.col-md-12 p');
        this.articleComment = page.locator('p.card-text');

        this.newCommentInputField = page.getByPlaceholder('Write a comment...');
        this.publishButton = page.getByRole('button', { name: 'Post Comment' });
    }

    async gotoArticlePage(articleTitle) {
        await test.step(`Перейти к статье "${articleTitle}"`, async () => {
            await this.page.goto(`#/article/${replaceSpecificSymbolsForLink(articleTitle)}`);
        });
    }

    async publishComment(comment) {
        await test.step('Опубликовать комментарий', async () => {
            await this.newCommentInputField.fill(comment);
            await this.publishButton.click();
        });
    }
}

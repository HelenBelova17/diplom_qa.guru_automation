import { test } from '@playwright/test';

export class ArticleCreationPage {
    constructor(page) {
        this.page = page;

        this.newArticleTitle = page.getByPlaceholder('Article Title');
        this.newArticleDescription = page.getByPlaceholder('What\'s this article about?');
        this.newArticleContent = page.getByPlaceholder('Write your article (in markdown)');
        this.newArticleTags = page.getByPlaceholder('Enter tags');

        this.newArticleButton = page.getByRole('link', { name: 'New Article' });
        this.newArticlePublishButton = page.getByRole('button', { name: 'Publish Article' });
    }

    async gotoArticleCreation() {
        await test.step('Перейти к созданию статьи', async () => {
            await this.newArticleButton.click();
        });
    }

    async createNewArticle(title, description, content, tags) {
        await test.step(`Создать статью "${title}"`, async () => {
            await this.newArticleTitle.fill(title);
            await this.newArticleDescription.fill(description);
            await this.newArticleContent.fill(content);

            tags.forEach((tag) => {
                this.newArticleTags.fill(tag);
            });

            await this.newArticlePublishButton.click();
        });
    }
}

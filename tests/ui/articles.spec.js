import { expect } from '@playwright/test';
import { test } from '../../src/helpers/fixtures/ui.fixtures';
import { ArticleBuilder, CommentBuilder } from '../../src/helpers/builders';

test.describe('Статьи', () => {

    test.beforeEach(async ({ webApp, user }) => {
        await webApp.main.gotoLogin();
        await webApp.login.login(user.email, user.password);
        await webApp.main.gotoMainPage();
    });

    test('Создание новой статьи', async ({ webApp }) => {
        const articleBuilder = new ArticleBuilder().addTitle().addContent()
            .addDescription().addTags(1).generate();

        await webApp.articleCreation.gotoArticleCreation();
        await webApp.articleCreation.createNewArticle(articleBuilder.title, articleBuilder.description,
            articleBuilder.content, articleBuilder.tags);

        await webApp.article.gotoArticlePage(articleBuilder.title);

        await expect(webApp.article.articleTitle).toHaveText(articleBuilder.title);
        await expect(webApp.article.articleContent).toHaveText(articleBuilder.content);
    });

    test('Публикация комментария к статье', async ({ webApp }) => {
        const articleBuilder = new ArticleBuilder().addTitle().addContent()
            .addDescription().addTags(1).generate();
        const commentBuilder = new CommentBuilder().addComment(7).generate();

        await webApp.articleCreation.gotoArticleCreation();
        await webApp.articleCreation.createNewArticle(articleBuilder.title, articleBuilder.description,
            articleBuilder.content, articleBuilder.tags);

        await webApp.article.gotoArticlePage(articleBuilder.title);
        await webApp.article.publishComment(commentBuilder.content);

        await expect(webApp.article.articleComment).toHaveText(commentBuilder.content);
    });
});
import { testTags } from "@/config/test-tags";
import { expect, test } from "@/fixtures/web.fixture";

test.describe("Case 4 - iFrame and multi-tab handling", () => {
    test(
        "iframe image opens the selenium live project in a new tab",
        { tag: [testTags.regression, testTags.desktop] },
        async ({ page, context, guru99HomePage }) => {
            await guru99HomePage.open();

            const [newTab] = await Promise.all([
                context.waitForEvent("page"),
                guru99HomePage.adImage.click(),
            ]);
            await newTab.waitForLoadState("domcontentloaded");

            await expect(
                newTab,
                "New tab should load the Selenium live project page",
            ).toHaveTitle(/Selenium Live Project/);

            await newTab.close();

            await expect(
                page,
                "Main window should remain on the guru99 home page",
            ).toHaveURL(/guru99home/);
        },
    );

    test(
        "testing menu navigates to the selenium tutorial page",
        { tag: [testTags.regression, testTags.desktop] },
        async ({ page, guru99HomePage, seleniumTutorialPage }) => {
            await guru99HomePage.open();

            await guru99HomePage.openTestingMenu();
            await guru99HomePage.seleniumLink.click();
            await page.waitForLoadState("load");

            await expect(
                page,
                "Selenium link should open the selenium tutorial page",
            ).toHaveURL(/selenium-tutorial/);
            await expect(
                seleniumTutorialPage.startLearningButton,
                "Selenium tutorial page should present its primary call-to-action",
            ).toBeVisible({ timeout: 15000 });
        },
    );
});

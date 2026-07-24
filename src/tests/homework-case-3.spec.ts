import { testTags } from "@/config/test-tags";
import { expect, test } from "@/fixtures/web.fixture";

test.describe("Case 3 - Rich text editor automation", () => {
    test.skip(
        ({ browserName }) => browserName === "webkit",
        "CKEditor is incompatible with headless WebKit in CI",
    );

    test(
        "types mixed bold, underline and plain formatted text",
        { tag: [testTags.regression, testTags.desktop] },
        async ({ richTextEditorPage }) => {
            await richTextEditorPage.open();

            await richTextEditorPage.typeBold("Automation");
            await richTextEditorPage.type(" ");
            await richTextEditorPage.typeUnderline("Test");
            await richTextEditorPage.type(" Example");

            await expect(
                richTextEditorPage.boldSegment("Automation"),
                "'Automation' should be rendered in bold",
            ).toBeVisible();
            await expect(
                richTextEditorPage.underlineSegment("Test"),
                "'Test' should be rendered underlined",
            ).toBeVisible();
            await expect(
                richTextEditorPage.editor,
                "Editor should contain the full formatted sentence",
            ).toContainText(/Automation\s+Test[\s\u2060\u200b]+Example/);
        },
    );
});

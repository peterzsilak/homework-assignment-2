import { BasePage } from "@/page-objects/base-page";

export class SeleniumTutorialPage extends BasePage {
    readonly startLearningButton = this.page
        .locator("a, button")
        .filter({ hasText: "Start Learning" })
        .first();
}

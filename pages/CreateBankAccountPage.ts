import { Page, Locator } from '@playwright/test';

export class CreateBankAccountPage {
    readonly page: Page;
    readonly form: Locator;
    readonly bankNameInput: Locator;
    readonly routingNumberInput: Locator;
    readonly accountNumberInput: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.form = page.locator('[data-test="bankaccount-form"]');
        this.bankNameInput = page.locator('[data-test="bankaccount-bankName-input"] input');
        this.routingNumberInput = page.locator('[data-test="bankaccount-routingNumber-input"] input');
        this.accountNumberInput = page.locator('[data-test="bankaccount-accountNumber-input"] input');
        this.submitButton = page.locator('[data-test="bankaccount-submit"]');
    }

    async fillForm({ bankName, routingNumber, accountNumber }: { bankName: string; routingNumber: string; accountNumber: string; }) {
        await this.bankNameInput.fill(bankName);
        await this.routingNumberInput.fill(routingNumber);
        await this.accountNumberInput.fill(accountNumber);
    }

    async submit() {
        await this.submitButton.click();
        await this.page.waitForResponse(
            response =>
                response.url() === 'http://localhost:3001/graphql' && response.status() === 200
        );
    }

    async getBankNameError(): Promise<string> {
        return (await this.page.locator('#bankaccount-bankName-input-helper-text').textContent())?.trim() ?? '';
    }

    async getRoutingNumberError(): Promise<string> {
        return (await this.page.locator('#bankaccount-routingNumber-input-helper-text').textContent())?.trim() ?? '';
    }

    async getAccountNumberError(): Promise<string> {
        return (await this.page.locator('#bankaccount-accountNumber-input-helper-text').textContent())?.trim() ?? '';
    }
}

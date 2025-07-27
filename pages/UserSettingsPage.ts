import { Page, Locator } from '@playwright/test';

export class UserSettingsPage {
    readonly firstNameError: Locator;
    readonly lastNameError: Locator;
    readonly emailError: Locator;
    readonly phoneNumberError: Locator;
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly phoneNumberInput: Locator;
    readonly saveButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.emailInput = page.getByPlaceholder('Email');
        this.phoneNumberInput = page.getByPlaceholder('Phone Number');
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.firstNameError = page.locator('#user-settings-firstName-input-helper-text');
        this.lastNameError = page.locator('#user-settings-lastName-input-helper-text');
        this.emailError = page.locator('#user-settings-email-input-helper-text');
        this.phoneNumberError = page.locator('#user-settings-phoneNumber-input-helper-text');
    }

    async getLastNameError(): Promise<string> {
        return (await this.lastNameError.textContent())?.trim() ?? '';
    }

    async getFirstNameError(): Promise<string> {
        return (await this.firstNameError.textContent())?.trim() ?? '';
    }

    async getEmailError(): Promise<string> {
        return (await this.emailError.textContent())?.trim() ?? '';
    }

    async getPhoneNumberError(): Promise<string> {
        return (await this.phoneNumberError.textContent())?.trim() ?? '';
    }

    async fillUserSettings({ firstName, lastName, email, phoneNumber }: { firstName: string; lastName: string; email: string; phoneNumber: string; }) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.phoneNumberInput.fill(phoneNumber);
    }

    async submit() {
        await this.saveButton.click();
    }
}

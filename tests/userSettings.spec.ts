import { test, expect } from '../fixtures/fixtures';

// Requirement: User Settings Management
// Acceptance criteria:
//   a. Must render the user settings form and display errors for invalid input.
//   b. Must allow updating first name, last name, email, and phone number.
//   c. Must disable submit button when form is invalid.
//   d. Must update user profile and reflect changes in UI.

test.describe('User Settings Management', () => {
    test.beforeEach(async ({ loginPage, sidebarPage }) => {
        // Navigate to User Settings page
        await loginPage.enterLoginDetails('Heath93', 's3cret');
        await loginPage.clickSubmit();
        await sidebarPage.gotoMyAccount();
    });

    test('should render the user settings form and display errors for invalid input', async ({ userSettingsPage }) => {
        await userSettingsPage.firstNameInput.fill('');
        await userSettingsPage.lastNameInput.fill('');
        await userSettingsPage.emailInput.fill('not-an-email');
        await userSettingsPage.phoneNumberInput.fill('');

        expect(await userSettingsPage.getFirstNameError())
            .toBe('Enter a first name');

        expect(await userSettingsPage.getLastNameError())
            .toBe('Enter a last name');

        expect(await userSettingsPage.getEmailError())
            .toBe('Must contain a valid email address');

        expect(await userSettingsPage.getPhoneNumberError())
            .toBe('Enter a phone number');
    });

    test('should disable submit button when form is invalid', async ({ userSettingsPage }) => {
        await userSettingsPage.firstNameInput.fill('');
        await userSettingsPage.lastNameInput.fill('');
        await userSettingsPage.emailInput.fill('');
        await userSettingsPage.phoneNumberInput.fill('');
        await expect(userSettingsPage.saveButton).toBeDisabled();
    });

    test('should allow updating first name, last name, email, and phone number', async ({ userSettingsPage }) => {
        await userSettingsPage.fillUserSettings({
            firstName: 'NewFirst',
            lastName: 'NewLast',
            email: 'new.email@example.com',
            phoneNumber: '123-456-7890',
        });
        await userSettingsPage.submit();

        await expect(userSettingsPage.firstNameInput).toHaveValue('NewFirst');
        await expect(userSettingsPage.lastNameInput).toHaveValue('NewLast');
        await expect(userSettingsPage.emailInput).toHaveValue('new.email@example.com');
        await expect(userSettingsPage.phoneNumberInput).toHaveValue('123-456-7890');
    });
});

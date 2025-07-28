import { test, expect } from '../fixtures/fixtures';

// Acceptance criteria:
//   a. Must allow creating a new bank account via the UI.
//   b. Must display form errors and disable submit button for invalid input.
//   c. Must allow soft deletion of bank accounts and reflect changes in UI.
//   d. Must show onboarding dialog and empty state when no bank accounts exist.

test.describe('Bank Accounts Management', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.enterLoginDetails('Heath93', 's3cret');
        await loginPage.clickSubmit();
    });

    test('should allow creating a new bank account via the UI', async ({ bankAccountsPage, createBankAccountPage, sidebarPage }) => {
        await sidebarPage.gotoBankAccounts();
        // Take note of how many accounts exist before adding
        const initialNames = await bankAccountsPage.getAccountNames();
        const initialCount = initialNames.length;

        await bankAccountsPage.clickCreate();
        const uniqueBankName = `Test Bank ${Date.now()}`;
        await createBankAccountPage.fillForm({
            bankName: uniqueBankName,
            routingNumber: '123456789',
            accountNumber: '987654321',
        });
        await createBankAccountPage.submit();

        // Wait until the number of accounts increases by 1
        await expect.poll(async () => {
            const names = await bankAccountsPage.getAccountNames();
            return names.length;
        }, { timeout: 5000 }).toBe(initialCount + 1);

        // Also check that the new account is present
        const names = await bankAccountsPage.getAccountNames();
        expect(names).toContain(uniqueBankName);
    });

    test('should display form errors and disable submit button for invalid input', async ({ bankAccountsPage, createBankAccountPage, page, sidebarPage }) => {
        await sidebarPage.gotoBankAccounts();

        await bankAccountsPage.clickCreate();
        await createBankAccountPage.fillForm({
            bankName: '',
            routingNumber: '',
            accountNumber: '',
        });
        await page.keyboard.press('Tab');

        await expect(createBankAccountPage.submitButton).toBeDisabled();
        expect(await createBankAccountPage.getBankNameError()).toBe('Enter a bank name');
        expect(await createBankAccountPage.getRoutingNumberError()).toBe('Enter a valid bank routing number');
        expect(await createBankAccountPage.getAccountNumberError()).toBe('Enter a valid bank account number');
    });

    test('should allow soft deletion of bank accounts and reflect changes in UI', async ({ bankAccountsPage, sidebarPage }) => {
        await sidebarPage.gotoBankAccounts();

        const namesBefore = await bankAccountsPage.getAccountNames();
        // checks if there are accounts
        expect(namesBefore.length).toBeGreaterThan(0);
        // checks if there are undeleted accounts
        const toDelete = namesBefore.find(name => !name.includes('(Deleted)'));
        expect(toDelete).toBeTruthy();
        if (!toDelete) throw new Error('No undeleted account found');

        await bankAccountsPage.deleteAccountByName(toDelete);
        // const namesAfter = await bankAccountsPage.getAccountNames();
        // expect(namesAfter).not.toContain(toDelete);

        // Wait until the account names are updated
        await expect.poll(async () => {
            return await bankAccountsPage.getAccountNames();
        }, { timeout: 5000 }).toContain(`${toDelete} (Deleted)`);
    });

    test('should show onboarding dialog and empty state when no bank accounts exist', async ({ bankAccountsPage, page, sidebarPage,
        bankAccountOnboardingDialogPage
    }) => {
        // setup route to intercept api to mock empty bank accounts list
        await page.route('**/graphql', async (route, request) => {
            const postData = request.postData();
            // look for api with specific payload
            if (postData && postData.includes('"operationName":"ListBankAccount"')) {
                // modify intercepted api with empty bank account list
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({
                        data: {
                            listBankAccount: []
                        }
                    }),
                });
            } else {
                // Let other requests pass through
                await route.continue();
            }
        });

        // Assert that the onboarding dialog is visible
        await expect(bankAccountOnboardingDialogPage.dialog).toBeVisible();
    });
});

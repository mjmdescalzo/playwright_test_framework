import { test, expect, request } from '@playwright/test';

// API tests for Bank Accounts endpoints
// Adjust endpoint paths and payloads as needed for your app

test.describe('Bank Accounts API', () => {
    let apiContext;

    test.beforeAll(async ({ playwright }) => {
        apiContext = await request.newContext({
            baseURL: 'http://localhost:3001', // Adjust if needed
        });
    });

    test.afterAll(async () => {
        await apiContext.dispose();
    });

    test('should get bank accounts for authenticated user', async () => {
        const userId = 'uBmeaz5pX';

        // Login to get auth token
        const loginResponse = await apiContext.post('/login', {
            data: {
                username: 'Heath93',
                password: 's3cret',
                type: "LOGIN"
            },
        });
        expect(loginResponse.ok()).toBeTruthy();
        // Extract session cookie
        const cookies = await apiContext.storageState();
        // Create a new context with the same cookies
        const authedContext = await request.newContext({
            baseURL: 'http://localhost:3001',
            storageState: cookies,
        });

        // Call GET /bankAccounts with session
        const response = await authedContext.get('/bankAccounts');
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.results[0].userId).toBe(userId);

        await authedContext.dispose();
    });

    // Add more API tests for create, update, delete, etc.

});

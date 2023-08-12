import { test, expect } from "@playwright/test";
import { RegisterPage } from "../pages/RegisterPage";
import user from "../fixtures/person";
import message from "../fixtures/adress"

let registerPage : RegisterPage;

test.beforeEach(({ page }) => {
    registerPage = new RegisterPage(page)
})

test.describe('Register', () => {
    test('Should clear the form successfully', async ({ page }) => {
        await registerPage.pageAcess()
        await registerPage.fillFullName(user.FIRST_NAME, user.LAST_NAME)
        await registerPage.fillAddress(message.success)
        await registerPage.fillEmail(user.EMAIL)
    })
})

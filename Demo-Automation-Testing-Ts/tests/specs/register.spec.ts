import { test, expect } from "@playwright/test";
import { RegisterPage } from "../pages/RegisterPage";

import user from "../fixtures/person";
import message from "../fixtures/adress"
import gender from "../fixtures/gender"

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
        await registerPage.fillPhone(user.PHONE)
        await registerPage.selectGender(gender.FEMALE)
        await registerPage.selectCricket()
        await registerPage.selectHockey()
        await registerPage.clickOnBtnRefresh()
        await registerPage.clickOnBtnSubmit()
    })
})


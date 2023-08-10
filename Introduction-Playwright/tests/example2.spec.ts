import { test, expect, type Page } from '@playwright/test'
import { HomePage } from '../pages/home-page';

// AAA

const URL = 'https://playwright.dev/';
let homePage: HomePage

test.beforeEach(async ({ page }) => {
    await page.goto(URL)
    homePage = new HomePage(page)
})

async function clickGetStarted(page: Page) {
    //await page.getByRole('link', { name: 'Get started' }).click();
    await homePage.clickGetStartedButton();
}

test.describe.only('Playwright website', () => { 

    const MENSAGEM = 'Playwright is distributed as a set of'

    test('has title', async () => {
        //await expect(page).toHaveTitle(/Playwright/);
        await homePage.assertPageTitle()
    })

    test('get started link', async ({ page }) => {
    // Click the get started link.
    await clickGetStarted(page)
    // Expects the URL to contain intro.
    await expect(page).toHaveURL(/.*intro/);
    });

    test('Check Java page', async ({ page }) => {
        await clickGetStarted(page)
        await page.getByRole('button', { name:  'Node.js' }).hover();
        await page.getByText('Java', { exact: true }).click()

        await expect(page).toHaveURL('https://playwright.dev/java/docs/intro')
        await expect(page.getByText('Installing Playwright', {exact: true})).not.toBeVisible()


        //const text = await page.locator('.markdown p:nth-child(3)')
        const text = await page.locator(`css=.markdown p:nth-child(3)`)
        await expect(text).toContainText(MENSAGEM)
    })
})

// npm init playwright@latest
import { test, type Page } from '@playwright/test';
import { HomePage } from '../pages/home-page';

import {
    BatchInfo,
    Configuration,
    EyesRunner,
    ClassicRunner,
    VisualGridRunner,
    BrowserType,
    DeviceName,
    ScreenOrientation,
    Eyes,
    Target
} from '@applitools/eyes-playwright';

const URL="https://playwright.dev/"

let homePage: HomePage;
const pageUrl = /.*intro/;

export const USE_ULTRAFAST_GRID: boolean = false;
export let Batch: BatchInfo;
export let Config: Configuration;
export let Runner: EyesRunner;
let eyes: Eyes;

test.beforeAll(async () => {
    if (USE_ULTRAFAST_GRID) {
        Runner = new VisualGridRunner({ testConcurrency: 5 });
    } else {
        Runner = new ClassicRunner();
    }

    const runnerName = (USE_ULTRAFAST_GRID) ? 'Ultrafast Grid' : 'Classic runner'
    Batch = new BatchInfo({ name: `Playwright website - ${runnerName}`})

    Config = new Configuration();

    Config.setBatch(Batch);
    if (USE_ULTRAFAST_GRID) {
        Config.addBrowser(800, 600, BrowserType.CHROME);
        Config.addBrowser(1600, 1200, BrowserType.FIREFOX);
        Config.addBrowser(1024, 768, BrowserType.SAFARI);
        Config.addDeviceEmulation(DeviceName.iPhone_11, ScreenOrientation.PORTRAIT);
        Config.addDeviceEmulation(DeviceName.Nexus_10, ScreenOrientation.LANDSCAPE);
    }
});

test.beforeEach(async ({ page }) => {
    eyes = new Eyes(Runner, Config);
    await eyes.open(
        page,
        "Playwright",
        test.info().title,
        { width: 1024, height: 768 }
    );

    await page.goto(URL);
    homePage = new HomePage(page);
})

test.afterEach(async () => {
    await eyes.close();
})

test.afterAll(async () => {
    const results = await Runner.getAllTestResults();
    console.log('Visual test results', results);
});

async function clickGetStarted(page: Page) {
    await homePage.clickGetStartedButton();
    //topMenuPage = new TopMenuPage(page); --> Não criado ainda
}

test ('has title', async () => {
    await eyes.check('Home page', Target.window().fully())
})

test('get started link', async ({ page }) => {
    await clickGetStarted(page);
    //await topMenuPage.assertPageUrl(pageUrl)
    await eyes.check('Get Started page', Target.window().fully().layout())
})

test ('check Java page', async ({ page }) => {
    await test.step('Act', async () => {
    });

    await test.step('Assert', async () => {
        /* await topMenuPage.assertPageUrl(pageUrl);
        await topMenuPage.assertNodeDescriptionNotVisible(pageUrl);
        await topMenuPage.assertJavaDescriptionVisible(pageUrl); */

        await eyes.check('Java page', Target.window().fully().ignoreColors())
    })
})

// npm i -D @applitools/eyes-playwright
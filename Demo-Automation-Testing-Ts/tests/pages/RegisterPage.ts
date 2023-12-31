import { Page, expect, Locator } from "@playwright/test";
import selector from "../selectors/registerSelector"

export class RegisterPage {
    readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly Address: Locator;
    readonly emailAdress: Locator;
    readonly phone: Locator;
    readonly gender_male: Locator;
    readonly gender_female: Locator;
    readonly cricket: Locator;
    readonly movies: Locator;
    readonly hockey: Locator;
    readonly languages: Locator;
    readonly skill: Locator;
    readonly selectCountry: Locator;
    readonly yearOfBirth: Locator;
    readonly monthOfBirth: Locator;
    readonly dayOfBirth: Locator;
    readonly password: Locator;
    readonly confirmPassword: Locator;
    readonly btnRefresh: Locator;
    readonly btnSubmit: Locator;
    readonly registerPageUrl: RegExp

    constructor(page: Page) {
        this.page = page
        this.firstName = page.locator(selector.FIRST_NAME)
        this.lastName = page.locator(selector.LAST_NAME);
        this.Address =  page.locator(selector.ADDRESS);
        this.emailAdress =   page.locator(selector.EMAIL_ADDRESS);
        this.phone = page.locator(selector.PHONE);
        this.gender_male = page.locator(selector.GENDER_MALE)
        this.gender_female = page.locator(selector.GENDER_FEMALE)
        this.cricket = page.locator(selector.CRICKET)
        this.movies = page.locator(selector.MOVIES)
        this.hockey = page.locator(selector.HOCKEY)
        this.btnRefresh = page.locator(selector.BTN_REFRESH)
        this.btnSubmit = page.locator(selector.BTN_SUBMIT)
        this.registerPageUrl = /.*Register.html/;
    }

    async pageAcess() {
        await this.page.goto('/Register.html')
    }

    async fillFullName(firstname: string, lastName: string) {
        await this.firstName.type(firstname)
        await this.lastName.type(lastName)
    }

    async fillAddress(message: string) {
        await this.Address.type(message)
    }

    async fillEmail(email: string) {
        await this.emailAdress.type(email)
    }

    async fillPhone(phone: string) {
        await this.phone.type(phone)
    }

    async selectGender(gender: string) {
        if (gender === 'M') {
            await this.gender_male.click();
        } else if (gender === 'F') {
            await this.gender_female.click();
        }
    }

    async selectCricket() {
        await this.cricket.click()
    }

    async selectMovies() {
        await this.movies.click()
    }

    async selectHockey() {
        await this.hockey.click()
    }
    
    async clickOnBtnRefresh() {
        await this.btnRefresh.click()
    }

    async clickOnBtnSubmit() {
        await this.btnSubmit.click()
    }

    async assertMessage(message: string) {
        const validationMessage = await this.firstName.evaluate(
            (e) => (e as HTMLInputElement).validationMessage)

        expect(validationMessage).toEqual(message)
    }

    async assertURL() {
        await expect(this.page).toHaveURL(this.registerPageUrl)
    }

}
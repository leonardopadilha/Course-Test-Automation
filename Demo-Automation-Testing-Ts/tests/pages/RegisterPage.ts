import { Page, expect, Locator } from "@playwright/test";
import selector from "../selectors/registerSelector"

export class RegisterPage {
    readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly Address: Locator;
    readonly emailAdress: Locator;
    readonly phone: Locator;
    readonly gender: Locator;
    readonly hobbies: Locator;
    readonly languages: Locator;
    readonly skill: Locator;
    readonly selectCountry: Locator;
    readonly yearOfBirth: Locator;
    readonly monthOfBirth: Locator;
    readonly dayOfBirth: Locator;
    readonly password: Locator;
    readonly confirmPassword: Locator;

    constructor(page: Page) {
        this.page = page
        this.firstName = page.locator(selector.FIRST_NAME)
        this.lastName = page.locator(selector.LAST_NAME);
        this.Address =  page.locator(selector.ADDRESS);
        this.emailAdress =   page.locator(selector.EMAIL_ADDRESS);
        this.phone = page.locator(selector.PHONE);
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

}
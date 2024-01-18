// cypress/e2e/signin.cy.js
/// <reference types="cypress" />

import userData from '../data/userData.json';
import Navigation from '../support/PageObject/Navigation';
import account from '../data/account.json';
import msg from '../data/messageData.json';


// const account = UserLocator.getCustomer();
const submit = Navigation.getSubmit();

describe('User Registration Test Suite', () => {
    beforeEach(() => {
        Navigation.visitHomepage();
        cy.clearAllCookies;
        cy.contains('Create an Account').click();
        cy.clearAllCookies;
    });

    it('Verifikasi dapat membuat akun untuk masuk', () => {
        const randomEmail = `test${Math.floor(Math.random() * 100000)}@example.com`;
        cy.get(account.first).type(userData.validUser.firstName);
        cy.get(account.last).type(userData.validUser.lastName);
        cy.get(account.email).type(randomEmail);
        cy.get(account.paswd).type(userData.validUser.password);
        cy.get(account.paswdConfirm).type(userData.validUser.password);
        cy.get(submit).click();
        cy.get(account.successMessageRegist)
            .should('be.visible')
            .should('contain', msg.registerSuccess);

    });

    it('Verifikasi tidak dapat membuat akun untuk masuk dengan invalid email', () => {
        const randomEmail = `test${Math.floor(Math.random() * 100000)}@example.com`;
        cy.get(account.first).type(userData.invalidUser1.firstName);
        cy.get(account.last).type(userData.invalidUser1.lastName);
        cy.get(account.email).type(randomEmail);
        cy.get(account.paswd).type(userData.invalidUser1.password);
        cy.get(account.paswdConfirm).type('differentpassword');
        cy.get(submit).click();
        cy.get(account.ConfirmError)
            .should('be.visible')
            .should('contain', msg.passwordConfirmError);
    });

    it('Verifikasi tidak dapat membuat akun untuk masuk dengan password hanya huruf', () => {
        const randomEmail = `test${Math.floor(Math.random() * 100000)}@example.com`;
        cy.get(account.first).type(userData.invalidUser2.firstName);
        cy.get(account.last).type(userData.invalidUser2.lastName);
        cy.get(account.email).type(randomEmail);
        cy.get(account.paswd).type(userData.invalidUser2.password);
        cy.get(account.paswdConfirm).type(userData.invalidUser2.password);
        cy.get(account.InvalidFormat)
            .should('be.visible')
            .should('contain', msg.password2);
    });

    it('Verifikasi tidak dapat membuat akun untuk masuk dengan password hanya angka', () => {
        const randomEmail = `test${Math.floor(Math.random() * 100000)}@example.com`;
        cy.get(account.first).type(userData.invalidUser3.firstName);
        cy.get(account.last).type(userData.invalidUser3.lastName);
        cy.get(account.email).type(randomEmail);
        cy.get(account.paswd).type(userData.invalidUser3.password);
        cy.get(account.paswdConfirm).type(userData.invalidUser3.password);
        cy.get(submit).click();
        cy.get(account.InvalidFormat)
            .should('be.visible')
            .should('contain', msg.password2);
    });

    it('Verifikasi tidak dapat membuat akun untuk masuk dengan password dengan symbol', () => {
        const randomEmail = `test${Math.floor(Math.random() * 100000)}@example.com`;
        cy.get(account.first).type(userData.invalidUser4.firstName);
        cy.get(account.last).type(userData.invalidUser4.lastName);
        cy.get(account.email).type(randomEmail);
        cy.get(account.paswd).type(userData.invalidUser4.password);
        cy.get(account.paswdConfirm).type(userData.invalidUser4.password);
        cy.get(submit).click();
        cy.get(account.InvalidFormat)
            .should('be.visible')
            .should('contain', msg.password2);
    });

    it('Verifikasi tidak dapat membuat akun untuk masuk dengan password dengan kombinasi huruf dan angka', () => {
        const randomEmail = `test${Math.floor(Math.random() * 100000)}@example.com`;
        cy.get(account.first).type(userData.invalidUser5.firstName);
        cy.get(account.last).type(userData.invalidUser5.lastName);
        cy.get(account.email).type(randomEmail);
        cy.get(account.paswd).type(userData.invalidUser5.password);
        cy.get(account.paswdConfirm).type(userData.invalidUser5.password);
        cy.get(submit).click();
        cy.get(account.InvalidFormat)
            .should('be.visible')
            .should('contain', msg.password2);
    });

    it('Verifikasi tidak dapat membuat akun untuk masuk dengan password dengan kombinasi huruf dan symbol', () => {
        const randomEmail = `test${Math.floor(Math.random() * 100000)}@example.com`;
        cy.get(account.first).type(userData.invalidUser6.firstName);
        cy.get(account.last).type(userData.invalidUser6.lastName);
        cy.get(account.email).type(randomEmail);
        cy.get(account.paswd).type(userData.invalidUser6.password);
        cy.get(account.paswdConfirm).type(userData.invalidUser6.password);
        cy.get(submit).click();
        cy.get(account.InvalidFormat)
            .should('be.visible')
            .should('contain', msg.password1);
    });

    it('Verifikasi tidak dapat membuat akun untuk masuk dengan password dengan kombinasi angka dan symbol', () => {
        const randomEmail = `test${Math.floor(Math.random() * 100000)}@example.com`;
        cy.get(account.first).type(userData.invalidUser7.firstName);
        cy.get(account.last).type(userData.invalidUser7.lastName);
        cy.get(account.email).type(randomEmail);
        cy.get(account.paswd).type(userData.invalidUser7.password);
        cy.get(account.paswdConfirm).type(userData.invalidUser7.password);
        cy.get(submit).click();
        cy.get(account.InvalidFormat)
            .should('be.visible')
            .should('contain', msg.password2);
    });

    it('Verifikasi tidak dapat membuat akun untuk masuk jika semua kolom kosong', () => {
        cy.get(submit).click();
        cy.get('#form-validate').should('be.visible');

    });

    // Add more test cases for other scenarios related to user registration.
});

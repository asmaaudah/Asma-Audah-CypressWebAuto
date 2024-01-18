// cypress/e2e/login.cy.js
/// <reference types="cypress" />

import Navigation from '../support/PageObject/Navigation';
import userData from '../data/userData.json';

//Login Start
describe('Login Test Suite', () => {
    beforeEach(() => {
        Navigation.visitHomepage();
        cy.contains('Sign In').click();
        cy.clearAllSessionStorage
    });

    it('Verifikasi dapat masuk dengan email dan password yg benar dan terdaftar', () => {
        cy.contains('Sign In').click();
        cy.get('#email').type(userData.validUser.email);
        cy.get('#pass').type(userData.validUser.password);
        cy.get('#send2').click();
        cy.wait(1000);
        Navigation.visitAccount();
        cy.get('.base').should('be.visible');
        cy.wait(500)
    });

    it('Verifikasi tidak dapat login dengan email yang salah ', () => {
        cy.contains('Sign In').click();
        cy.get('#email').type(userData.invalidUser6.email);
        cy.get('#pass').type(userData.validUser.password);
        cy.get('#send2').click();
        cy.get('.message-error > div').should('be.visible');
        cy.wait(500)

    });

    it('Verifikasi tidak dapat login dengan password yang salah', () => {
        cy.contains('Sign In').click();
        cy.get('#email').type(userData.validUser.email);
        cy.get('#pass').type(userData.invalidUser2.password);
        cy.get('#send2').click();
        cy.get('.message-error > div').should('be.visible');

    });

    it('Verifikasi tidak dapat login dengan akun yang tidak terdaftar', () => {
        cy.contains('Sign In').click();
        cy.get('#email').type(userData.invalidUser6.email);
        cy.get('#pass').type(userData.invalidUser2.password);
        cy.get('#send2').click();
        cy.get('.message-error > div').should('be.visible');
        cy.wait(500)
    });

    it('Verifikasi dapat keluar', () => {
        cy.contains('Sign In').click();
        cy.get('#email').type(userData.validUser.email);
        cy.get('#pass').type(userData.validUser.password);
        cy.get('#send2').click();
        cy.get(':nth-child(2) > .customer-welcome > .customer-name > .action').click();
        cy.get(':nth-child(2) > .customer-welcome > .customer-menu > .header > .authorization-link > a').click({ force: true });
        cy.get('.base').contains('You are signed out').should('be.visible');
        cy.contains('Sign In').should('be.visible');
        cy.wait(500);
    });

    it('Verifikasi dapat menampilkan halaman informasi akun dan menampilkan nama pelanggan', () => {
        cy.contains('Sign In').click();
        cy.get('#email').type(userData.validUser.email);
        cy.get('#pass').type(userData.validUser.password);
        cy.get('#send2').click();
        Navigation.visitAccount();
        cy.get('.base').contains("My Account").should('be.visible');
        cy.wait(500)

        // Click pada "My Account" link atau button
        cy.get('.current > strong').contains('My Account').click();

        // Verifikasi user dapat masuk ke halaman informasi akun dan menampilkan informasi
        cy.get('.block-dashboard-info > .block-title > strong').contains('Account Information').should('be.visible');
        cy.wait(5000)
    });

    it('Verifikasi dapat mengubah password', () => {
        cy.bypass()
        cy.contains('Sign In').click();
        cy.get('#email').type(userData.validUser.email);
        cy.get('#pass').type(userData.validUser.password);
        cy.get('#send2').click();
        Navigation.visitAccount();
        cy.get('.change-password').click();
        cy.get('#current-password').type(userData.validUser.password);
        cy.get('#password').type(userData.validUser.password);
        cy.get('#password-confirmation').type(userData.validUser.password);
        cy.get('button[title="Save"]').click()
        cy.wait(500)

        // Verifikasi user kembali ke halaman login setalah mengubah password
        cy.get('.base').contains('Customer Login').should('be.visible');
        cy.get('.message-success > div').should('have.text', 'You saved the account information.');
        cy.wait(5000)
    });

    it('Verifikasi dapat mengubah nama pelanggan di halaman informasi akun', () => {
        cy.contains('Sign In').click();
        cy.get('#email').type(userData.validUser.email);
        cy.get('#pass').type(userData.validUser.password);
        cy.get('#send2').click();
        Navigation.visitAccount();
        cy.get('.block-dashboard-info > .block-content > .box > .box-actions > .edit > span').click();
        cy.get('#firstname').clear().type(userData.validUser.firstName);
        cy.get('#lastname').clear().type(userData.validUser.lastName);
        cy.get('button[title="Save"]').click()
        cy.wait(500)

        // Verifikasi user kembali ke halaman informasi akun setalah mengubah nama pelanggan
        cy.get('.block-dashboard-info > .block-title > strong').contains('Account Information').should('be.visible');
        cy.wait(5000)
    });

    it('Verifikasi dapat menavigasi ke semua halaman akun pelanggan dan menampilkan judul yang benar', () => {
        cy.contains('Sign In').click();
        cy.get('#email').type(userData.validUser.email);
        cy.get('#pass').type(userData.validUser.password);
        cy.get('#send2').click();
        Navigation.visitAccount();
        cy.get('.base').contains("My Account").should('be.visible');
        Navigation.visitOrderHistory();
        cy.get('.base').contains("My Orders").should('be.visible');
        Navigation.visitDownloadProduct();
        cy.get('.base').contains("My Downloadable Products").should('be.visible');
        Navigation.visitWishList();
        cy.get('.base').contains("My Wish List").should('be.visible');
        Navigation.visitAddressBook();
        cy.get('.base').contains("Address Book").should('be.visible');
        Navigation.visitAccountInformation();
        cy.get('.base').contains("Edit Account Information").should('be.visible');
        Navigation.visitPaymentMethod();
        cy.get('.base').contains("Stored Payment Methods").should('be.visible');
        Navigation.visitProductReview();
        cy.get('.base').contains("My Product Reviews").should('be.visible');
        cy.wait(500)
    });

    it('Verifikasi dapat menavigasi ke riwayat pesanan dan menampilkan bahwa tidak ada pesanan yang dilakukan', () => {
        cy.bypass()
        cy.contains('Sign In').click();
        cy.get('#email').type(userData.validUser.email);
        cy.get('#pass').type(userData.validUser.password);
        cy.get('#send2').click();
        Navigation.visitOrderHistory();
        cy.get('.message > span').should('have.text', 'You have placed no orders.');
        cy.wait(500)
    });
});

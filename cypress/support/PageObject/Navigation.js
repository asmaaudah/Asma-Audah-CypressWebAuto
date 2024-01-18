// cypress/page/Navigation.js
class Navigation {
    visitHomepage() {
        cy.visit('https://magento.softwaretestingboard.com/');
    }
    visitAccount() {
        cy.visit('https://magento.softwaretestingboard.com/customer/account/');
    }
    visitHoodie() {
        cy.visit('https://magento.softwaretestingboard.com/hero-hoodie.html');
    }
    visitTshirt() {
        cy.visit('https://magento.softwaretestingboard.com/radiant-tee.html');
    }
    visitOrderHistory() {
        cy.visit('https://magento.softwaretestingboard.com/sales/order/history/');
    }

    visitDownloadProduct() {
        cy.visit('https://magento.softwaretestingboard.com/downloadable/customer/products/');
    }

    visitWishList() {
        cy.visit('https://magento.softwaretestingboard.com/wishlist/');
    }

    visitAddressBook() {
        cy.visit('https://magento.softwaretestingboard.com/customer/address/');
    }

    visitAccountInformation() {
        cy.visit('https://magento.softwaretestingboard.com/customer/account/edit/');
    }

    visitPaymentMethod() {
        cy.visit('https://magento.softwaretestingboard.com/vault/cards/listaction/');
    }

    visitProductReview() {
        cy.visit('https://magento.softwaretestingboard.com/review/customer/');
    }
    getSubmit() {
        return ('#form-validate > .actions-toolbar > div.primary > .action');
    }


}


export default new Navigation();


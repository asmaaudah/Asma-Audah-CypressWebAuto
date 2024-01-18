// cypress/e2e/product.cy.js
/// <reference types="cypress" />

import Navigation from '../support/PageObject/Navigation';
import ProductLocator from '../support/PageObject/ProductLocator';
import PriceLocator from '../support/PageObject/PriceLocator';
import TabLocator from '../support/PageObject/TabLocator';
import userData from '../data/userData.json';
import msg from '../data/messageData.json';


// Use the ProductLocator class to get the product link locator
const stuff = ProductLocator.getProduct_hoodie();
const price2 = PriceLocator.getPrice2();
const tabdetail = TabLocator.getTabInfoDetail();
const tabInfoAdd = TabLocator.getTabInfoAdd();
const tabReview = TabLocator.getTabReview();
const zoom = ProductLocator.getZoom();
const hero = ProductLocator.getProdInfo();
const detailDesc = ProductLocator.getdetailDesc();
const InfoAddDesc = ProductLocator.getInfoAddDesc();
const ReviewDesc = ProductLocator.getReviewDesc();


describe('Product Test suite', () => {
  beforeEach(() => {
    Navigation.visitHomepage();
    Navigation.visitHoodie();
    cy.clearAllSessionStorage();
    cy.clearAllCookies();
    // cy.wait(2000)
  })

  it('Verifikasi tanpa login dapat menampilkan judul dan gambar produk', () => {
    Navigation.visitHomepage();
    cy.get(stuff).should('contain', 'Hero').click();
    cy.wait(1000);
    cy.get(hero).should('contain', 'Hero');
  })

  it('Verifikasi dapat memperbesar tampilan gambar produk', () => {
    cy.get(zoom).click();
    cy.wait(1000);
    cy.get('.fotorama__fullscreen-icon').click();
  })

  it('Verifikasi menunjukkan judul, gambar, dan harga produk', () => {
    cy.get(price2).should('contain', '$54.00');

  });

  it('Verifikasi dapat melihat details dan informasi produk', () => {
    cy.get(tabdetail).should('be.visible');
    cy.wait(1000);
    cy.get(tabInfoAdd).click();
    cy.wait(1000);
    cy.get(tabInfoAdd).should('be.visible');
    cy.wait(1000);
    cy.get(tabReview).click();
    cy.wait(1000);
    cy.get(tabReview).should('be.visible');

  });

  it('Verifikasi dapat menambahkan produk ke keranjang', () => {
    cy.get('#option-label-size-143-item-170').click();
    cy.wait(1000);
    cy.get('#qty').clear();
    cy.get('#qty').type('3');
    cy.wait(1000);
    cy.get('#option-label-color-93-item-53').click();
    cy.wait(1000);
    cy.get('#product-addtocart-button').click();
    cy.get('.message-success > div').should('be.visible');
    cy.wait(500);
  });

  it('Verifikasi user login dapat melihat dan menambah produk ke keranjang belanja', () => {
    Navigation.visitHomepage();
    cy.contains('Sign In').click();
    cy.get('#email').type(userData.validUser.email);
    cy.get('#pass').type(userData.validUser.password);
    cy.get('#send2').click();
    cy.get(stuff).click();
    cy.wait(1000);
    cy.get(stuff).should('be.visible');
    Navigation.visitHoodie();
    cy.get(zoom).click();
    cy.wait(1000);
    cy.get('.fotorama__fullscreen-icon').click();
    cy.get(price2).should('contain', '$54.00');
    cy.get(detailDesc)
      .should('be.visible')
      .should('contain', msg.Desc1);
    cy.get(tabInfoAdd).click();
    cy.get(InfoAddDesc)
      .should('be.visible')
      .should('contain', msg.Desc2);
    cy.get(tabReview).click();
    cy.get(ReviewDesc)
      .should('be.visible')
      .should('contain', msg.Desc3);
    cy.get('#option-label-size-143-item-170').click();
    cy.wait(1000);
    cy.get('#qty').clear();
    cy.get('#qty').type('3');
    cy.wait(1000);
    cy.get('#option-label-color-93-item-53').click();
    cy.get('#product-addtocart-button').click();
    cy.get('.message-success > div').should('be.visible');

  });

})

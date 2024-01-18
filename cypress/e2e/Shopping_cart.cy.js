// cypress/e2e/Shopping_Cart.cy.js
import Navigation from '../support/PageObject/Navigation';
import ProductLocator from '../support/PageObject/ProductLocator';
import PriceLocator from '../support/PageObject/PriceLocator';
import TabLocator from '../support/PageObject/TabLocator';
import userData from '../data/userData.json';


// Use the ProductLocator class to get the product link locator
const tshirt = ProductLocator.getProduct_tshirt();
const hoodie = ProductLocator.getProduct_hoodie();
const mini_list = ProductLocator.getCartList();
const cart_item = ProductLocator.getCart_tshirt();
const disc = ProductLocator.getCart_Disc();
const cart_delete = ProductLocator.getCartDelete();
const size = ProductLocator.getSize();
const color = ProductLocator.getColor();
const colorMan = ProductLocator.getColorMan();
const price = PriceLocator.getPrice();
const tabdetail = TabLocator.getTabInfoDetail();
const tabInfoAdd = TabLocator.getTabInfoAdd();
const tabReview = TabLocator.getTabReview();
const zoom = ProductLocator.getZoom();
const productName = "Radiant Tee";
const Man = "Hero";
const newQuantity = 2;


describe("Shopping Cart Page", () => {
  beforeEach(() => {
    Navigation.visitHomepage();
    cy.wait(1000);
    cy.contains('Sign In').click();
    cy.get('#email').type(userData.validUser.email);
    cy.get('#pass').type(userData.validUser.password);
    cy.get('#send2').as('btn').click();
    cy.wait(5000);
  });

  // it('Verifikasi user login dapat melihat dan menambah produk ke keranjang belanja', () => {
  //   cy.get("#search").type(productName).type("{enter}");
  //   cy.get(tshirt).click();
  //   cy.wait(10000);
  //   cy.get(tshirt).should('be.visible');
  //   Navigation.visitTshirt();
  //   cy.get(zoom).click();
  //   cy.wait(1000);
  //   cy.get('.fotorama__fullscreen-icon').click();
  //   cy.get(price).should('contain', '$22.00');
  //   cy.get(size).click();
  //   cy.get(color).click();
  //   cy.wait(1000);
  //   cy.get(tabdetail).should('be.visible');
  //   cy.wait(1000);
  //   cy.get('#qty').clear();
  //   cy.get('#qty').type('1');
  //   cy.wait(1000);
  //   cy.get(tabInfoAdd).click();
  //   cy.wait(1000);
  //   cy.get(tabInfoAdd).should('be.visible');
  //   cy.wait(1000);
  //   cy.get(tabReview).click();
  //   cy.wait(1000);
  //   cy.get(tabReview).should('be.visible');
  //   cy.wait(1000);
  //   cy.get('#product-addtocart-button').click();
  //   cy.get('.message-success > div').should('be.visible');
  //   cy.wait(5000);
  // });

  // it("Verifikasi dapat mengubah jumlah dalam keranjang", () => {
  //   cy.wait(10000);
  //   cy.get('.showcart > .counter').should('be.visible');
  //   cy.get('.minicart-wrapper > .action').click();
  //   cy.wait(10000);
  //   cy.get(mini_list).click();
  //   cy.wait(10000);
  //   cy.get(cart_item).first().type('{selectall}3');
  //   cy.get('.update > span').contains("Update").click();
  // });

  // it("Verifikasi menampilkan harga dan total produk yang benar", () => {
  //   cy.wait(10000);
  //   cy.get('.showcart > .counter').should('be.visible');
  //   cy.get('.minicart-wrapper > .action').click();
  //   cy.wait(10000);
  //   cy.get(mini_list).click();
  //   cy.wait(10000);
  //   cy.get('.cart-summary').should('be.visible');
  //   // cy.get('strong > .price').should('contain', '$192.00');
  //   cy.get('strong > .price').should('be.visible');
  // });

  // it("Verifikasi tidak dapat menambahkan kupon yang tidak ada", () => {
  //   cy.wait(10000);
  //   cy.get('.showcart > .counter').should('be.visible');
  //   cy.get('.minicart-wrapper > .action').click();
  //   cy.wait(10000);
  //   cy.get(mini_list).click();
  //   cy.wait(10000);
  //   cy.get(cart_item).first().type('{selectall}3');
  //   cy.get('#block-discount > .title').click();
  //   cy.get('#coupon_code').type('ABC123');
  //   cy.get(disc).click();
  //   cy.get('.update > span').contains("Update").click();
  //   cy.get('.message-error > div').should('be.visible');
  //   cy.wait(5000);

  // });

  // it('Verifikasi dapat menggabungkan barang yang sudah dalam keranjang dengan barang yang baru dipilih', () => {
  //   cy.get("#search").type(Man).type("{enter}");
  //   cy.get('.block > :nth-child(2) > a').click();
  //   cy.wait(1000);
  //   cy.get(hoodie).should('be.visible');
  //   Navigation.visitHoodie();
  //   cy.get(zoom).click();
  //   cy.wait(1000);
  //   cy.get('.fotorama__fullscreen-icon').click();
  //   cy.get(price).should('contain', '$54.00');
  //   cy.get(size).click();
  //   cy.get(colorMan).click();
  //   cy.get(tabdetail).should('be.visible');
  //   cy.wait(1000);
  //   cy.get('#qty').clear();
  //   cy.get('#qty').type('1');
  //   cy.wait(1000);
  //   cy.get(tabInfoAdd).click();
  //   cy.wait(1000);
  //   cy.get(tabInfoAdd).should('be.visible');
  //   cy.wait(1000);
  //   cy.get(tabReview).click();
  //   cy.wait(1000);
  //   cy.get(tabReview).should('be.visible');
  //   cy.wait(1000);
  //   cy.get('#product-addtocart-button').click();
  //   cy.get('.message-success > div').should('be.visible');
  //   cy.wait(5000);
  // });

  it('Verifikasi tidak dapat menambahkan produk dengan qty 0 ke dalam keranjang belanja', () => {
    cy.get("#search").type(productName).type("{enter}");
    cy.get(tshirt).click();
    cy.wait(1000);
    cy.get(tshirt).should('be.visible');
    Navigation.visitTshirt();
    cy.get(zoom).click();
    cy.wait(1000);
    cy.get('.fotorama__fullscreen-icon').click();
    cy.wait(1000);
    cy.get(price).should('contain', '$22.00');
    cy.get(size).click();
    // cy.get(color).click();
    cy.get('#qty').clear();
    cy.get('#qty').type('0');
    cy.get('#product-addtocart-button').click();
    cy.get('#qty-error').should('be.visible');
    cy.wait(1000);
  });

  // it("Verifikasi user dapat menghapus produk dari keranjang", () => {
  //   cy.wait(10000);
  //   cy.get('.showcart > .counter').should('be.visible');
  //   cy.get('.minicart-wrapper > .action').click();
  //   cy.wait(5000);
  //   cy.get(mini_list).click();
  //   cy.wait(10000);
  //   cy.get('#form-validate').contains("Hero").should("be.visible");
  //   cy.get(cart_delete).click();
  // })
})

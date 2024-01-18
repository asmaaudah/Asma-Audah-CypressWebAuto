// cypress/e2e/Checkout.cy.js
import Navigation from "../support/PageObject/Navigation";
import ProductLocator from "../support/PageObject/ProductLocator";
import userData from "../data/userData.json";
// import checkoutData from '../data/checkoutData.json';
import TabLocator from "../support/PageObject/TabLocator";

// Use the ProductLocator class to get the product link locator
const tshirt = ProductLocator.getProduct_tshirt();
const size = ProductLocator.getSize();
const color = ProductLocator.getColor();
const price = ProductLocator.getProdInfo();
const productName = "Radiant Tee";
const mini_list = ProductLocator.getCartList();
const tabdetail = TabLocator.getTabInfoDetail();
const tabInfoAdd = TabLocator.getTabInfoAdd();
const tabReview = TabLocator.getTabReview();

describe("Checkout Page", () => {
  beforeEach(() => {
    Navigation.visitHomepage();
    cy.clearAllSessionStorage();
    cy.clearAllCookies();
  });

  it("Verifikasi menunjukkan harga yang benar seperti subtotal, PPN, biaya pengiriman, total dan produk yang ditambahkan ke keranjang", () => {
    cy.get("#search").type(productName).type("{enter}");
    cy.get(tshirt).click();
    cy.wait(10000);
    cy.get(tshirt).should("be.visible");
    Navigation.visitTshirt();
    cy.get(price).should("contain", "$22.00");
    cy.get(size).click();
    cy.get(color).click();
    cy.wait(1000);
    cy.get(tabdetail).should("be.visible");
    cy.wait(1000);
    cy.get("#qty").clear();
    cy.get("#qty").type("1");
    cy.wait(1000);
    cy.get(tabInfoAdd).click();
    cy.get(tabReview).click();
    cy.get("#product-addtocart-button").click();
    cy.get(".message-success > div").should("be.visible");
    cy.get(".message-success > div > a").click();
    cy.wait(10000);
    cy.get(".cart-summary").should("be.visible");
    cy.get("strong > .price").should("be.visible");
  });

  it("Verifikasi dapat memilih dan menggunakan semua metode pengiriman yang tercantum dengan benar", () => {
    Navigation.visitHomepage();
    cy.get("#search").type(productName).type("{enter}");
    cy.get(tshirt).click();
    cy.wait(10000);
    cy.get(tshirt).should("be.visible");
    Navigation.visitTshirt();
    cy.get("#option-label-size-143-item-170").click();
    cy.get(color).click();
    cy.wait(1000);
    cy.get("#qty").clear();
    cy.get("#qty").type("1");
    cy.wait(1000);
    cy.get("#product-addtocart-button").click();
    cy.get(".message-success > div").should("be.visible");
    cy.get(".message-success > div > a").click();
    cy.wait(10000);
    cy.get(".cart-summary").should("be.visible");
    cy.get("strong > .price").should("be.visible");
    cy.get(".checkout-methods-items > :nth-child(1) > .action").click();
    cy.wait(6000);
    cy.get(
      "#customer-email-fieldset > .required > .control > #customer-email"
    ).type("test@test.com");
    cy.get("#customer-password").type("Test@1234");
    cy.get('[name="shippingAddress.firstname"]').type(
      userData.invalidUser1.firstName
    );
    cy.get('[name="shippingAddress.lastname"]').type(
      userData.invalidUser1.lastName
    );
    cy.get(":nth-child(2) > ._required > .control").type("Bogor");
    cy.get(".street").type("jalan-jalan");
    cy.get('[name="shippingAddress.city"]').type("jalan-jalan");
    cy.get('[name="region_id"]').select("Armed Forces Americas");
    cy.get('[name="shippingAddress.postcode"]').type(12345);
    cy.get('[name="country_id"]').select("United States");
    cy.get('[name="shippingAddress.telephone"]').type(12374567789);
    cy.get("#checkout-shipping-method-load").should("be.visible");
    cy.get("#label_method_flatrate_flatrate").click();
    cy.wait(3000);
    cy.get(".button.action.continue.primary").click();
    cy.get(".payment-method-content").should("be.visible");
    cy.get(".ship-via")
      .should("contain", "Flat Rate - Fixed")
      .should("be.visible");
  });

  it("Verifikasi dapat menemukan dan memesan dalam riwayat pesanan pelanggan setelah melakukan pemesanan", () => {
    cy.bypass();
    Navigation.visitHomepage();
    cy.wait(1000);
    cy.contains("Sign In").click();
    cy.get("#email").type(userData.validUser.email);
    cy.get("#pass").type(userData.validUser.password);
    cy.get("#send2").as("btn").click();
    cy.wait(10000);
    cy.get(".showcart > .counter").should("be.visible");
    cy.get(".minicart-wrapper > .action").click();
    cy.wait(5000);
    cy.get(mini_list).click();
    cy.wait(3000);
    cy.get(".cart-summary").should("be.visible");
    cy.get(".checkout-methods-items > :nth-child(1) > .action").click();
    cy.wait(1000);
    cy.get("#shipping > .step-title")
      .should("be.visible")
      .should("contain", "Shipping Address");
    cy.wait(1000);
    cy.get(".shipping-address-item").should("be.visible");
    cy.wait(1000);
    cy.get("#label_method_flatrate_flatrate").click();
    cy.wait(3000);
    cy.get(".button.action.continue.primary").click();
    cy.get(".payment-method-content").should("be.visible");
    cy.wait(1000);
    cy.get(".ship-via")
      .should("contain", "Flat Rate - Fixed")
      .should("be.visible");
  });

  it("Verifikasi dapat secara otomatis mengisi nama dan alamat pelanggan", () => {
    cy.contains("Sign In").click();
    cy.get("#email").type(userData.validUser.email);
    cy.get("#pass").type(userData.validUser.password);
    cy.get("#send2").as("btn").click();
    cy.wait(5000);
    cy.get(".showcart > .counter").should("be.visible");
    cy.wait(1000);
    cy.get(".minicart-wrapper > .action").click();
    cy.wait(5000);
    cy.get(mini_list).click();
    cy.wait(1000);
    cy.get(".cart-summary").should("be.visible");
    cy.get(".checkout-methods-items > :nth-child(1) > .action").click();
    cy.wait(1000);
    cy.get(".shipping-address-items").should("contain", "651651");
    cy.wait(1000);
  });

  it("Verifikasi dapat menemukan dan memesan dalam riwayat pesanan (reordder)", () => {
    cy.bypass();
    Navigation.visitHomepage();
    cy.wait(1000);
    cy.contains("Sign In").click();
    cy.get("#email").type(userData.validUser.email);
    cy.get("#pass").type(userData.validUser.password);
    cy.get("#send2").as("btn").click();
    cy.wait(1000);
    cy.get(
      ":nth-child(2) > .customer-welcome > .customer-name > .action"
    ).click();
    cy.get(
      ":nth-child(2) > .customer-welcome > .customer-menu > .header > :nth-child(1) > a"
    ).click();
    cy.get(".page-footer > .content").scrollIntoView();
    cy.wait(500);
    cy.get(":nth-child(1) > .actions > .order > span").click();
    cy.wait(500);
    cy.get(".checkout-methods-items > :nth-child(1) > .action").click();
    cy.wait(500);
    cy.get(".shipping-address-items").should("contain", "651651");
    cy.wait(1000);
    cy.get(".button > span").click();
  });

  it("Verifikasi button delete produk dari keranjang", () => {
    Navigation.visitHomepage();
    cy.wait(1000);
    cy.contains("Sign In").click();
    cy.get("#email").type(userData.validUser.email);
    cy.get("#pass").type(userData.validUser.password);
    cy.get("#send2").as("btn").click();
    cy.wait(1000);
    cy.get(".showcart > .counter").should("be.visible");
    cy.get(".minicart-wrapper > .action").click();
    cy.wait(1000);
    cy.get(
      ".odd > :nth-child(1) > .product-item-details > .actions > .secondary > .action"
    ).click();
    cy.get(".action-primary").click();
    cy.wait(1000);
  });
});

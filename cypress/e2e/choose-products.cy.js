import ProductPage from '../support/PageObject/product-page';
describe('choose product(s)', () => {
  const productPage = new ProductPage();

  it('From Best Seller and click from the image', () => {
    productPage.visit();
    productPage.chooseProductFromBestSeller(':nth-child(1) > .product-item-info > .product-item-photo > .product-image-container > .product-image-wrapper > .product-image-photo');
    productPage.verifyProductDetails('#product-price-1556 > .price', '$22.00');
    productPage.navigateProductImages();
    productPage.zoomProductImages();
  });

  it('Pilih dari hasil search', () => {
    productPage.visit();
    const keyword = 'compression short';
    productPage.searchForProduct(keyword);

    // Memeriksa apakah teks elemen mengandung kata 'Compression Short'
    cy.get('a.product-item-link[href="https://magento.softwaretestingboard.com/echo-fit-compression-short.html"]')
         .should('exist')
        .contains('Compression Short');
        cy.get(':nth-child(1) > .product-item-info > .photo > .product-image-container > .product-image-wrapper > .product-image-photo').click();   
        cy.get('.base')
        .should('exist')
        // Memeriksa apakah teks elemen mengandung kata 'Compression Short'
        .contains('Compression Short'); 
  });
  

  it('From Best Seller and click from the rating', () => {
    productPage.visit();
    // Temukan dan pilih produk
    cy.get(':nth-child(2) > .product-item-info > .product-item-details > .product-reviews-summary > .rating-summary > .rating-result').first().click();
    // Verifikasi bahwa elemen yang seharusnya muncul setelah diklik tidak ada atau tidak terlihat
    cy.get('.fotorama__active > .fotorama__img').should('not.exist');
  });
});

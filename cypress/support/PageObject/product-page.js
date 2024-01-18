class ProductPage {
    visit() {
      cy.visit('');
    }
  
    chooseProductFromBestSeller(selectedLocator) {
      cy.get(selectedLocator).first().click();
    }
  
    verifyProductDetails(selectedLocator, expectedText) {
        cy.get(selectedLocator).should('have.text', expectedText);
        cy.get('#description').should('exist');
        cy.get('#tab-label-additional-title').should('exist');
        cy.get('#tab-label-reviews-title').should('exist');
    }      
  
    navigateProductImages() {
      cy.get('.fotorama__arr--next > .fotorama__arr__arr').click();
      cy.get('.fotorama__arr--prev > .fotorama__arr__arr').click();
    }
  
    zoomProductImages() {
      cy.get('.magnify-wheel-loaded > .fotorama__img').click();
      cy.get('.fotorama__zoom-in').click();
      cy.get('.fotorama__zoom-out').click();
      cy.get('.fotorama__fullscreen-icon').click();
    }

  
  
    searchForProduct(keyword) {
        this.keyword = keyword;
        cy.get('#search').first().click().type(`${keyword}{enter}`);
    }
    
    // validateSearchResult(expectedUrl) {
    //     cy.get(`a.product-item-link[href="${expectedUrl}"]`).should('exist').contains(this.keyword);
    // }
    
    // selectProductFromSearchResult() {
    //     cy.get(':nth-child(1) > .product-item-info > .photo > .product-image-container > .product-image-wrapper > .product-image-photo').click();
    //     cy.get('.base').should('exist').contains(this.keyword);
    // }
 
}
export default ProductPage;
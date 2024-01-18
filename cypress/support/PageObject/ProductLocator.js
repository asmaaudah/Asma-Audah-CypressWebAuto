// cypress/support/PageObject/ProductLocator.js
class ProductLocator {
    getProductLink() {
        return ':nth-child(2) > .product-item-info > .product-item-details > .product-item-name > .product-item-link';
    }
    getProduct_hoodie() {
        return ':nth-child(4) > .product-item-info';
    }
    getProduct_tshirt() {
        return ':nth-child(1) > .product-item-info > .photo > .product-image-container > .product-image-wrapper > .product-image-photo';
    }
    getZoom() {
        return '.fotorama__active > .fotorama__img';
    }
    getSize() {
        return ('#option-label-size-143-item-168');
    }
    getColor() {
        return ('#option-label-color-93-item-57');
    }
    getColorMan() {
        return ('[id^="option-label-color-93-item-49"]');
    }
    getCartList() {
        return ':nth-child(7) > .secondary > .action > span';
    }
    getCartDelete() {
        return ':nth-child(3) > .item-actions > td > .actions-toolbar > .action-delete';
    }
    getCart_tshirt() {
        return ('.col.qty > .field > .control');
    }
    getCart_Disc() {
        return ('#discount-coupon-form > .fieldset > .actions-toolbar > div.primary > .action > span');
    }
    getProdInfo() {
        return ('.product-info-main');
    }
    getdetailDesc() {
        return ('#description');
    }
    getInfoAddDesc() {
        return ('.additional-attributes-wrapper');
    }
    getReviewDesc() {
        return ('#reviews');
    }
}

export default new ProductLocator();

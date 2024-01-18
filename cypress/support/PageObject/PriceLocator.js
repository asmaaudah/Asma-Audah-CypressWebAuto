// cypress/page/PriceLocator.js
class PriceLocator {
    getPrice() {
        return '#product-price-1556 > .price';
    }

    getPrice2() {
        return '#product-price-158 > .price';
    }
}

export default new PriceLocator();

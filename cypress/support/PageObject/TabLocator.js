// cypress/page/TabLocator.js
class TabLocator {
    getTabInfoDetail() {
        return '#tab-label-description-title';
    }
    getTabInfoAdd() {
        return '#tab-label-additional-title';
    }
    getTabReview() {
        return '#tab-label-reviews-title';
    }
}

export default new TabLocator();
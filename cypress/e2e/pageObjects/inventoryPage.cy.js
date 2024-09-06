class Inventory {
    verifyInventoryPageLoaded() {
      cy.url().should('include', '/inventory.html');
    }
  
    addItemToCart(itemIndex) {
      cy.get('.inventory_item').eq(itemIndex).within(() => {
        cy.get('.btn_primary').click();
      });
    }
  
    removeItemFromCart(itemIndex) {
      cy.get('.inventory_item').eq(itemIndex).within(() => {
        cy.get('.btn_secondary').click();
      });
    }
  
    verifyCartItemCount(expectedCount) {
      cy.get('.shopping_cart_badge').should('have.text', expectedCount.toString());
    }
  
    verifyCartIsEmpty() {
      cy.get('.shopping_cart_badge').should('not.exist');
    }
  
    sortBy(option) {
      cy.get('.product_sort_container').select(option);
    }
  
    verifyProductsSortedByPrice() {
      let prices = [];
      cy.get('.inventory_item_price').each(($el) => {
        prices.push(parseFloat($el.text().replace('$', '')));
      }).then(() => {
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).to.deep.equal(sortedPrices);
      });
    }
  
    verifyItemsHaveImageAndName() {
      cy.get('.inventory_item').each(($el) => {
        cy.wrap($el).find('.inventory_item_img').should('be.visible');
        cy.wrap($el).find('.inventory_item_name').should('be.visible');
      });
    }
  
    clickOnFirstProduct() {
      cy.get('.inventory_item').first().find('.inventory_item_name').click();
    }
  
    verifyProductDetailsPage() {
      cy.url().should('include', '/inventory-item.html');
      cy.get('.inventory_details_name').should('be.visible');
    }
  
    goToCart() {
      cy.get('.shopping_cart_link').click();
      cy.url().should('include', '/cart.html');
    }
  
    proceedToCheckout() {
      cy.get('.checkout_button').click();
      cy.url().should('include', '/checkout-step-one.html');
    }
  }
  
  export default Inventory;
  
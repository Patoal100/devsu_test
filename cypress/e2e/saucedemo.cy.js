describe('Flujo de compra en SauceDemo', () => {
  it('Compra exitosa', () => {
    cy.visit('/');

    // Login
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    // Agregar 2 productos
    cy.contains('.inventory_item', 'Sauce Labs Backpack')
      .contains('Add to cart').click();
    cy.contains('.inventory_item', 'Sauce Labs Bike Light')
      .contains('Add to cart').click();

    // Carrito
    cy.get('.shopping_cart_link').click();
    cy.url().should('include', '/cart.html');
    cy.get('.cart_item').should('have.length.at.least', 2);

    // Checkout
    cy.get('#checkout').click();
    cy.get('#first-name').type('Patricio');
    cy.get('#last-name').type('Ramon');
    cy.get('#postal-code').type('12345');
    cy.get('#continue').click();

    // Finalizar
    cy.get('#finish').click();

    // Aserción final robusta
    cy.contains('Thank you for your order', { timeout: 10000 }).should('be.visible');
  });
});

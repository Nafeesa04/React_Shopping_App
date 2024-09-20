describe('Delete Product', () => {
    beforeEach(() => {
      localStorage.setItem('adminToken', 'mocked-token');
      cy.visit('http://localhost:3000/delete-product');
    });
  
    it('should successfully delete a product with valid ID', () => {
      cy.intercept('DELETE', '/api/products/delete/*', {
        statusCode: 200,
        body: { message: 'Product deleted successfully!' },
      }).as('deleteProduct');
  
      cy.get('input[placeholder="Enter Product ID"]').type('12345'); // Mock product ID
      cy.get('button').contains('Delete Product').click();
  
      cy.wait('@deleteProduct').its('response.statusCode').should('eq', 200);
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Product deleted successfully!');
      });
    });
  
    it('should show an error message when the product deletion fails', () => {
      cy.intercept('DELETE', '/api/products/delete/*', {
        statusCode: 400,
        body: { message: 'Error deleting product' },
      }).as('deleteProductFail');
  
      cy.get('input[placeholder="Enter Product ID"]').type('12345'); // Mock product ID
      cy.get('button').contains('Delete Product').click();
  
      cy.wait('@deleteProductFail').its('response.statusCode').should('eq', 400);
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Error deleting product');
      });
    });
  
    it('should alert if no product ID is entered', () => {
      cy.get('button').contains('Delete Product').click();
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Please enter a product ID');
      });
    });
  });
  
// cypress/e2e/addProducts.cy.js
describe('Add Products', () => {
    beforeEach(() => {
      localStorage.setItem('adminToken', 'mocked-token');
      cy.visit('http://localhost:3000/products/add');
    });
  
    it('should successfully add a product with valid inputs', () => {
      cy.intercept('POST', '/api/products/add', {
        statusCode: 200,
        body: { message: 'Product added successfully' },
      }).as('addProduct');
  
      cy.get('#productName').type('Test Product');
      cy.get('#description').type('This is a test product description.');
      cy.get('#features').type('Feature 1, Feature 2');
      cy.get('#price').type('100');
      cy.get('#quantity').type('10');
      cy.get('#status').select('available');
      cy.get('button[type="submit"]').click();
  
      cy.wait('@addProduct').its('response.statusCode').should('eq', 200);
      cy.contains('Product added successfully').should('exist'); // Ensure this matches your success alert
    });
  
    it('should show an error message when API call fails', () => {
      cy.intercept('POST', '/api/products/add', {
        statusCode: 400,
        body: { message: 'Failed to add product' },
      }).as('addProductFail');
  
      cy.get('#productName').type('Test Product');
      cy.get('#description').type('This is a test product description.');
      cy.get('#features').type('Feature 1, Feature 2');
      cy.get('#price').type('100');
      cy.get('#quantity').type('10');
      cy.get('#status').select('available');
      cy.get('button[type="submit"]').click();
  
      cy.wait('@addProductFail').its('response.statusCode').should('eq', 400);
      cy.contains('Failed to add product').should('exist'); // Ensure this matches your failure alert
    });
  
    it('should validate required fields', () => {
        // Click the submit button without filling out the form
        cy.get('button[type="submit"]').click();
      
        // Check for the required validation state
        cy.get('#productName').should('have.attr', 'required');
        cy.get('#description').should('have.attr', 'required');
        cy.get('#features').should('have.attr', 'required');
        cy.get('#price').should('have.attr', 'required');
        cy.get('#quantity').should('have.attr', 'required');
      
      // For the status dropdown, check if the default value is still selected
      cy.get('#status').should('have.value', 'available'); // Adjust this if 'available' is the default value
    });
  });
  
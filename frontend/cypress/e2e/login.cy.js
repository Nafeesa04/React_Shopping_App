describe('Login Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/login');
      cy.intercept('POST', '/api/auth/login').as('loginRequest');
    });
  
    it('should log in with valid credentials', () => {
      cy.get('input[type="text"]').type('Sneha01'); // Replace with valid login ID
      cy.get('input[type="password"]').type('Sneha@04'); // Replace with valid password
      cy.get('button[type="submit"]').click();
  
      cy.wait('@loginRequest', { timeout: 15000 }).then((interception) => {
        console.log(interception); // Log the interception for debugging
        expect(interception.response.statusCode).to.eq(200); // Check for successful response
      });
  
      cy.url().should('include', '/products'); 
    });
  
    it('should show an error message for invalid credentials', () => {
      cy.get('input[type="text"]').type('invalidLoginId');
      cy.get('input[type="password"]').type('invalidPassword');
      cy.get('button[type="submit"]').click();
  
      cy.wait('@loginRequest').then((interception) => {
        console.log(interception); // Log the interception for debugging
        expect(interception.response.statusCode).to.eq(400); // Check for error response
      });
  
      cy.get('.error').should('contain', 'Invalid Credentials');
    });
  });
  
  
  
  
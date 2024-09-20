// adminLogin.cy.js
describe('Admin Login', () => {
    beforeEach(() => {
      // Visit the admin login page before each test
      cy.visit('http://localhost:3000/admin/login');
    });
  
    it('should log in with valid credentials', () => {
      cy.get('#adminId').type('validAdminId'); // Replace with a valid admin ID
      cy.get('#password').type('validPassword'); // Replace with a valid password
      cy.get('button[type="submit"]').click();
  
      // Check for successful navigation or a specific element that appears after login
      cy.url().should('include', '/admin'); // Adjust based on your app's route
    });
  
    it('should show error for invalid credentials', () => {
      cy.get('#adminId').type('invalidId');
      cy.get('#password').type('invalidPassword');
      cy.get('button[type="submit"]').click();
  
      // Check for the error message in the DOM
      cy.get('.error-message', { timeout: 10000 }).should('be.visible').and('contain', 'Invalid admin credentials');
    });
  });
  
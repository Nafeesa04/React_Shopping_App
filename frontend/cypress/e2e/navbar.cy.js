describe('Navbar Component', () => {
    beforeEach(() => {
      // Assuming you have a route set up that renders the Navbar
      cy.visit('http://localhost:3000/'); // Change this to the appropriate route for your app
    });
  
    it('should display navigation links', () => {
      cy.get('nav')
        .should('exist')
        .within(() => {
          cy.contains('Home').should('have.attr', 'href', '/');
          cy.contains('Login').should('have.attr', 'href', '/login');
          cy.contains('Register').should('have.attr', 'href', '/register');
          cy.contains('Admin Login').should('have.attr', 'href', '/admin/login');
          cy.get('button.logout').should('exist').and('contain', 'Logout');
        });
    });
  
    it('should log out and redirect to home page', () => {
        localStorage.setItem('token', 'fakeToken');
      
        cy.window().then((win) => {
          cy.stub(win, 'alert').as('alert'); // Stub the alert
        });
      
        cy.get('button.logout').click();
      
        cy.window().then((win) => {
          expect(win.localStorage.getItem('token')).to.be.null;
        });
      
        cy.url().should('include', '/');
        cy.get('@alert').should('have.been.calledWith', 'You have logged out successfully.');
      });
      
  });
  
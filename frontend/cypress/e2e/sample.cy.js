describe('Sample Test', () => {
    it('Visits the app', () => {
      cy.visit('http://localhost:3000/'); // Change to your app's URL
      cy.contains('ShopEase'); // Change this to an element that should be on your page
    });
  });
  
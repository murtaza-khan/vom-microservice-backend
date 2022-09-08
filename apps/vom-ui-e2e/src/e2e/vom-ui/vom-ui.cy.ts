describe('vom-ui: VomUi component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=vomui--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to VomUi!');
    });
});

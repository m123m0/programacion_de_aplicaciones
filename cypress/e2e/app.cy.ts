describe('Generación de tickets - E2E', () => {

  it('permite iniciar sesión y acceder a incidentes', () => {
    cy.visit('/login');

    cy.window().then(win => {
      win.localStorage.setItem('auth_token', 'OK');
    });

    cy.visit('/tabs/incidentes');
    cy.contains('Incidentes');
  });

  it('permite navegar al detalle de un incidente', () => {
    cy.window().then(win => {
      win.localStorage.setItem('auth_token', 'OK');
    });

    cy.visit('/tabs/incidentes');
    cy.get('ion-item').first().click();
    cy.url().should('include', '/detalle');
  });

});

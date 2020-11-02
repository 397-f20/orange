describe('Check Navigation', () => {
    it('Makes sure navigation works throughout the app', () => {
      cy.visit('/')
    //   choose Weinberg template
      cy.get('div[role=button]').contains('Weinberg').click()

    //   add category screen
      cy.get('div[role=button]').contains('Add Category').click()

    //   go back to home screen
      cy.get('[data-testid="header-back"]').click()

    // add course screen
    cy.get('[aria-label="Add Course, tab, 2 of 3"]').click()

    //   go back to template screen
      cy.get('[aria-label="Templates, tab, 1 of 3"]').click()

    // choose McCormick template
    cy.get('div[role=button]').contains('McCormick').click()
    });
  });
describe('Check Navigation', () => {
  it('Makes sure navigation works throughout the app', () => {
    cy.visit('/')
    //   choose Weinberg template
    cy.get('div[role=button]').contains('Weinberg').click()

    //   add category screen
    cy.get('div[role=button]').contains('Add Category').click()

    //   go back to home screen
    cy.get('[aria-label="Degree Progress, back"]').click()

    // add course screen
    cy.get('div[role=button]').contains('Add Course').click()

    // go back to home screen
    cy.get('[aria-label="Degree Progress, back"]').click()

    //   go back to template screen
    cy.get('[aria-label="Degree Templates, back"]').click()

    // choose McCormick template
    cy.get('div[role=button]').contains('McCormick').click()
  });
});
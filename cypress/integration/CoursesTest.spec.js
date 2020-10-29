beforeEach(() => {
    cy.visit('/');
});

describe('Test courses', () => {
    it('can add a new course to unallocated', () => {
        cy.get('div[role=button]').contains('Weinberg').click()
        cy.get('[href="/AddCourseScreen"]').click()
        cy.get('input').click().type('340')
        cy.contains('340').click()
        cy.get('div').should('contain', 'CS 340')
    });
  });


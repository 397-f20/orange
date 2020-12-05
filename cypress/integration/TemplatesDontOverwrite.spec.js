beforeEach(() => {
    cy.visit('/');
    cy.waitForReact();
});

describe('Templates do not replace existing plans', () => {
    it('can add a new course to unallocated', () => {
        cy.visit ('/');
        cy.contains('Templates').click()
        cy.contains('Computer Science - Weinberg').click()
        cy.get('[data-test-id="header-back"]').click()
        cy.contains('Templates').click()
        cy.contains('Computer Science - Weinberg').click()
        cy.get('[data-test-id="header-back"]').click()
        cy.contains('Saved Plans').click()
        cy.contains("Computer Science - Weinberg")
        cy.contains("Computer Science - Weinberg - 1")
    });
});

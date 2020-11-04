beforeEach(() => {
    cy.visit('/');
});

describe('Test courses', () => {

    it('can add a new course to unallocated', () => {
        cy.get('div[role=button]').contains('Weinberg').click()
        cy.contains('Add Course').click()
        cy.get('input').click().type('340')
        cy.contains('COMP_SCI 340').click()
        cy.get('div').should('contain', 'COMP_SCI 340')
    });

    it('Move CS 340-0 course from Unallocated category to Natural Sciences category', () => {
        cy.waitForReact();

        // ADD COURSE TO UNALLOCATED
        cy.get('div[role=button]').contains('Weinberg').click()
        cy.get('[href="/AddCourseScreen"]').click()
        cy.get('input').click().type('340')
        cy.contains('COMP_SCI 340').click()
        cy.get('div').should('contain', 'COMP_SCI 340')

        // MOVE CATEGORY FROM UNALLOCATED
        cy.react('Category', { props: { name: 'Unallocated' } });
        cy.react('Course', { props: { title:'Introduction to Networking', number: '340-0' } }).click();
        cy.react('Menu.Item', {
        props: { title: 'Natural Sciences (Area I)' },
        }).click();
        cy.react('Category', {
        props: { name: 'Natural Sciences (Area I)' },
        }).contains('Introduction to Networking');

        cy.react('Category', {
        props: { name: 'Unallocated' },
        }).should('not.contain', 'Introduction to Networking');
    });
  });


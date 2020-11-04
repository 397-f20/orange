beforeEach(() => {
    cy.visit('/');
});

describe('Test courses', () => {

    it('can add a new course to unallocated', () => {
        cy.get('div[role=button]').contains('Weinberg').click()
        cy.get('div[role=button]').contains('Add Course').click()
        cy.get('input').click().type('340')
        cy.contains('COMP_SCI 340').click()
        // cy.get('div').should('contain', 'COMP_SCI 340')
        cy.waitForReact();
        cy.react('List.Item', {
        props: { title: 'Unallocated' },
        }).click();
        cy.get('div[role=button]').contains('Add Course').click({ force: true })
    });

    it('Move CS 340-0 course from Unallocated category to Natural Sciences category', () => {
        cy.waitForReact();

        // ADD COURSE TO Breadth Courses
        cy.get('div[role=button]').contains('Weinberg').click()
        cy.get('div[role=button]').contains('Add Course').click()
        cy.get('input').click().type('340')
        cy.contains('COMP_SCI 340-0').click()
        cy.waitForReact();
        cy.react('List.Item', {
        props: { title: 'Breadth Courses' },
        }).click();
        cy.get('div[role=button]').contains('Add Course').click({ force: true }).wait(500)
        

        // MOVE CATEGORY FROM Breadth to Technical Electives
        cy.react('Category', { props: { name: 'Breadth Courses' } });
        cy.react('Course', { props: { title:'Introduction to Networking', number: '340-0' } }).click();
        cy.react('Menu.Item', {
        props: { title: 'Technical Electives' },
        }).click();
        cy.react('Category', {
        props: { name: 'Technical Electives' },
        }).contains('Introduction to Networking');

        cy.react('Category', {
        props: { name: 'Breadth Courses' },
        }).should('not.contain', 'Introduction to Networking');
    });
  });


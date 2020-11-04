beforeEach(() => {
    cy.visit('/');
});

describe('Test courses', () => {

    it('can add a new course to unallocated', () => {
        cy.get('div[role=button]').contains('Weinberg').click()
        cy.get('div[role=button]').contains('Add Course').click()
        cy.get('input').click().type('340')
        cy.contains('COMP_SCI 340').click()
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

        cy.wait(500)
        cy.scrollTo(0,500)
        cy.wait(500)
        cy.get("[aria-label='addcoursedialog']").contains('Natural Sciences (Area I)').click()
        cy.wait(300)
        cy.get("[aria-label='addcoursefrommodal']").click()

        // // MOVE CATEGORY FROM Breadth to Technical Electives
        cy.react('Category', { props: { name: 'Natural Sciences (Area I)' } }).wait(300);
        cy.contains('Introduction to Networking').scrollIntoView().wait(200).click()

        cy.scrollTo(0,0)
        cy.wait(1000)
        cy.react('Menu.Item', {
        props: { title: 'Formal Studies (Area II)' },
        }).click();

        cy.react('Category', {
        props: { name: 'Formal Studies (Area II)' },
        }).contains('Introduction to Networking');

        cy.react('Category', {
        props: { name: 'Natural Sciences (Area I)' },
        }).should('not.contain', 'Introduction to Networking');
    });
  });


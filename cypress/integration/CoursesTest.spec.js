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

        cy.wait(1000)
        cy.get('[aria-label=addcoursedialog]').get('Breadth Courses').click()

        cy.scrollTo(0,700)
        cy.get('[aria-label=addcoursefrommodal]').click({force: true}).wait(400)

        // MOVE CATEGORY FROM Breadth to Technical Electives
        cy.react('Category', { props: { name: 'Breadth Courses' } }).wait(300);

        cy.scrollTo(0, 1000)
        cy.contains('Introduction to Networking').click({force: true})
        // cy.react('Course',
        //     { props: { title:'Introduction to Networking', number: '340-0' } }).wait(300)
        //     .click({force: true}).wait(300)

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


beforeEach(() => {
    cy.visit('/');
    cy.waitForReact();
});

describe('Test courses', () => {

    it('can add a new course to unallocated', () => {
        cy.get('div[role=button]').contains('Weinberg').click()
        cy.get('div[role=button]').contains('Add Course').click()
        cy.get('input').click().type('340')
        cy.contains('COMP_SCI 340-0').click()

        cy.wait(1000)
        cy.get('.r-borderBottomWidth-qklmqi > :nth-child(1)').click();
        // cy.react('List.Item', {
        // props: { title: 'Unallocated' },
        // }).click();
        cy.get('[aria-label=addcoursefrommodal]').click({force: true})
      
        cy.react('Category', {
        props: { name: 'Unallocated' },
        }).contains('Introduction to Networking');
    });

    it('Move CS 340-0 course from Unallocated category to Natural Sciences category', () => {

        // ADD COURSE TO Breadth Courses
        cy.get('div[role=button]').contains('Weinberg').click()
        cy.get('div[role=button]').contains('Add Course').click()
        cy.get('input').click().type('340')
        cy.contains('COMP_SCI 340-0').click()

        cy.wait(1000)
        cy.react('List.Item', { 
        props: { title: 'Breadth Courses' },
        }).click();

        cy.scrollTo(0,700)
        cy.get('[aria-label=addcoursefrommodal]').click({force: true})

        // MOVE CATEGORY FROM Breadth to Technical Electives
        cy.get(':nth-child(9) > .r-flexGrow-16y2uox > :nth-child(1) > :nth-child(2) > :nth-child(1) > .r-padding-edyy15 > .r-flexDirection-18u37iz').click({force: true})
        // cy.react('Course',
        //     { props: { title:'Introduction to Networking', number: '340-0' } })
        // .click({force: true})

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


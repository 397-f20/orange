describe('Template Screen', () => {
  it('Renders appropriate Weinberg Categories', () => {
    cy.visit('/')
    //   choose Weinberg template
    cy.get('div[role=button]').contains('Weinberg').click()

    // test to make sure proper components render for weinberg template
    cy.get('div[role=button]').contains('Unallocated')
    cy.get('div[role=button]').contains('Natural Sciences (Area I)')
    cy.get('div[role=button]').contains('Formal Studies (Area II)')
    cy.get('div[role=button]').contains('Social and Behavioral Sciences (Area III)')
    cy.get('div[role=button]').contains('Historical Studies (Area IV)')
    cy.get('div[role=button]').contains('Ethics and Values (Area V)')
    cy.get('div[role=button]').contains('Literature and Fine Arts (Area VI')
    cy.get('div[role=button]').contains('Core Courses')
    cy.get('div[role=button]').contains('Breadth Courses')
    cy.get('div[role=button]').contains('Technical Electives')
    cy.get('div[role=button]').contains('Project Courses')


    // go back to template screen
    cy.get('[aria-label="Templates, tab, 1 of 3"]').click()

    // choose McCormick template
    cy.get('div[role=button]').contains('McCormick').click()

    // test to make sure proper components render for McCormick template
    cy.get('div[role=button]').contains('Unallocated')
    cy.get('div[role=button]').contains('Math')
    cy.get('div[role=button]').contains('Engineering Analysis and Computer Proficiency')
    cy.get('div[role=button]').contains('Basic Science')
    cy.get('div[role=button]').contains('DTC')
    cy.get('div[role=button]').contains('Basic Engineering')
    cy.get('div[role=button]').contains('Social Sciences/Humanities')
    cy.get('div[role=button]').contains('Unrestricted Electives')
    cy.get('div[role=button]').contains('Core Courses')
    cy.get('div[role=button]').contains('Breadth Courses')
    cy.get('div[role=button]').contains('Technical Electives')
    cy.get('div[role=button]').contains('Project Courses')
    
  });
});
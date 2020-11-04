
describe('<AddCategoryScreen/>', () => {
  it('Allows adding a new category', () => {
    cy.visit('/')
    cy.get('div[role=button]').contains('Weinberg').click()
    cy.get('div[role=button]').contains('Add Category').click()
    cy.get('input[placeholder=Untitled').clear().type('Sample Category')
    cy.get('input[placeholder=Untitled').should('have.value', 'Sample Category')
    cy.get('span').contains('Add Category').click()
    cy.get('div[role=button]').contains('Sample Category')
  });
});

describe('<HomeScreen/>', () => {
  it('Move CS 101 course from Unallocated category to Natural Sciences category', () => {
    cy.visit('/');
    cy.waitForReact();
    cy.get('div[role=button]').contains('Weinberg').click();
    cy.react('Category', { props: { name: 'Unallocated' } });
    cy.react('Course', { props: { number: '101' } }).click();
    cy.react('Menu.Item', {
      props: { title: 'Natural Sciences (Area I)' },
    }).click();
    cy.react('Category', {
      props: { name: 'Natural Sciences (Area I)' },
    }).contains('CS 101');
    cy.react('Category', { props: { name: 'Unallocated' } })
        .should('not.contain', 'CS 101')
  });
});

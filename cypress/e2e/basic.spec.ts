context('Basic', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('basic nav', () => {
    cy.get('#search')
      .type('styling{Enter}')
      .url()
      .should('eq', 'http://localhost:3333/search/styling?category=all')
  })
})

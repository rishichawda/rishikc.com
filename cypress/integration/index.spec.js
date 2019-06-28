/* eslint-disable no-undef */
describe('Home', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.waitForRouteChange()
  })
  it('Can navigate to About page by click header navigation button.', () => {
    cy.getByText('About')
      .click()
      .waitForRouteChange()
    cy.url().should('equal', `${window.location.origin}/about`)
  })
  it('Can navigate to Blog page by click header navigation button.', () => {
    cy.getByText('Blogs')
      .click()
      .waitForRouteChange()
    cy.url().should('equal', `${window.location.origin}/articles`)
  })
})

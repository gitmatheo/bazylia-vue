describe('Login test', () => {
  before(function () {
    cy.visit('http://localhost:8080')
  })

  beforeEach(function () {
    cy.get('[data-cy=username]').clear()
    cy.get('[data-cy=password]').clear()
  })

  it('Verify that login page is shown first', () => {
    cy.url().should('include', 'login')
  })

  // it('Verify that login page has proper inputs', () => {
  //   cy.get('[data-cy=username]').type('admin').should('be.visible')
  //   cy.get('[data-cy=password]').type('admin123')
  // })

  it('Show error message when username is not flled in', () => {
    cy.get('[data-cy=username]').focus()
    cy.get('[data-cy=password]').type('admin123')
    cy.get('[data-cy=submit]').click()

    cy.contains('Login jest wymagany.').should('be.visible')
    cy.contains('Hasło jest wymagane').should('not.be.visible')
  })

  it('Show error messages when inputs are not filled in', () => {
    cy.get('[data-cy=username]').focus()
    cy.get('[data-cy=password]').focus()
    cy.get('[data-cy=submit]').click()

    cy.contains('Login jest wymagany.').should('be.visible')
    cy.contains('Hasło jest wymagane').should('be.visible')
  })

  it('Show error snackbar when login credentials are invalid', () => {
    cy.server()
    cy.route('GET', '/login').as('login')

    cy.get('[data-cy=username]').type('INVALID USERNAME')
    cy.get('[data-cy=password]').type('INVALID PASSWORD')
    cy.get('[data-cy=submit]').click()

    cy.contains('Nieprawidłowe dane - sprawdź swój login i hasło').should(
      'be.visible'
    )

    cy.wait('@login').its('status').should('eq', 401)
  })

  it('Verify that user roles are recognized correctly – admin', () => {
    cy.server()
    cy.route('GET', '/login').as('login')

    cy.get('[data-cy=username]').type('admin')
    cy.get('[data-cy=password]').type('admin123')
    cy.get('[data-cy=submit]').click()

    // cy.wait('@login').its('status').should('eq', 200)
    cy.wait('@login').then((response) => {
      expect(response.status).to.eql(200)
      expect(response.response.body).to.have.property('roles')
      expect(response.response.body.roles).to.eql(['ROLE_ADMIN'])
    })
  })

  // it('Verify that user roles are recognized correctly – regular user', () => {
  //   cy.server()
  //   cy.route('GET', '/login').as('login')

  //   cy.get('[data-cy=username]').type('grazyna')
  //   cy.get('[data-cy=password]').type('grazyna123')
  //   cy.get('[data-cy=submit]').click()

  //   cy.wait('@login').then((response) => {
  //     expect(response.status).to.eql(200)
  //     expect(response.response.body).to.have.property('roles')
  //     expect(response.response.body.roles).to.eql(['ROLE_RECEPCJA'])
  //   })
  // })
})

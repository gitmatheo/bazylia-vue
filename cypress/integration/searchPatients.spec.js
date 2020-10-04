describe('Search patients test', () => {
  before(function() {
    cy.clearLocalStorageCache()
    cy.visit('http://localhost:8081')
    cy.login('admin', 'admin123')
  })

  beforeEach(() => {
    cy.restoreLocalStorageCache()
    Cypress.Cookies.defaults({
      whitelist: () => {
        return true
      }
    })
  })

  afterEach(() => {
    cy.saveLocalStorageCache()
  })

  it('Show list of patients after login', () => {
    cy.server()
    // cy.fixture('patients.json').as('patients')
    cy.route({
      url: '/pacjenci*',
      method: 'GET',
      status: 200
    }).as('pacjenci')

    // cy.get('[data-cy=get-patients-button]').click()

    cy.wait('@pacjenci').then(response => {
      expect(response.status).to.eql(200)
    })

    cy.contains('Lista pacjentów')
      .siblings('ul')
      .children()
      .should('have.length', 11)
  })

  it('Verify that pagination displays correct number', () => {
    const paginationPagesLength = 2
    const paginationArrowsLength = 2
    const paginationChildrenLength =
      paginationPagesLength + paginationArrowsLength
    cy.get('.v-pagination')
      .children()
      .should('have.length', paginationChildrenLength)
  })

  it('Search is showing correct number of patients', () => {
    cy.get('[data-cy=surname]').type('ki')

    cy.contains('Lista pacjentów')
      .siblings('ul')
      .children('[data-cy=patient]')
      .should('have.length', 3)

    cy.get('[data-cy=surname]').clear()

    cy.contains('Lista pacjentów')
      .siblings('ul')
      .children('[data-cy=patient]')
      .should('have.length', 10)
  })

  it('Medycyna Pracy - Flow', () => {
    cy.get('[data-cy=patient]')
      .first()
      .next()
      .click()
    cy.get('.v-expansion-panel__container--active').within(() => {
      cy.contains('Rejestruj wizyte').click()
    })

    cy.get('.v-dialog__content--active').within(() => {
      cy.contains('Medycyna Pracy').click()
    })

    //TYP BADAN
    cy.url().should('contain', '/medycyna-pracy')

    cy.contains('Wybierz typ badań')

    cy.get('.v-input--radio-group__input').within(() => {
      cy.contains('Wstępne').click()
      cy.contains('Okresowe').click()
      cy.contains('Sanitarno-epidemiologiczne').click()
      cy.contains('Kontrolne').click()
    })

    cy.get('[data-cy=next-button-step1]').should('not.be.disabled')
    cy.get('[data-cy=next-button-step1]').click()

    //FIRMA

    cy.contains('Rejestracja - Medycyna Pracy')
    cy.contains('Wybierz firmę')

    cy.get('.v-input--radio-group__input').within(() => {
      cy.contains('Użyj Firmy / ostatnio wybrana').click()
      cy.contains('Użyj firmy z bazy danych').click()
      cy.contains('Dodaj firmę').click()
      cy.contains('Użyj Firmy / ostatnio wybrana').click()
    })

    cy.get('[data-cy=next-button-step2]').should('not.be.disabled')
    cy.get('[data-cy=next-button-step2]').click()

    //Date AND TIME
    cy.contains('Rejestracja - Medycyna Pracy')
    cy.contains('Wybierz datę i godzinę')

    //dzisiejsza data

    cy.get('[data-cy="time-picker"]').click()
    cy.get('.v-time-picker-clock__container').within(() => {
      cy.contains('3').click()
    })
    cy.get('.v-time-picker-clock__container').within(() => {
      cy.contains('15').click()
    })

    cy.get('[data-cy="time-picker"]')
      .invoke('val')
      .then(text => {
        expect('03:15').to.equal(text)
      })

    cy.get('[data-cy=next-button-step3]').should('not.be.disabled')
    cy.get('[data-cy=next-button-step3]').click()

    //WYBIERZ USLUGE
    cy.contains('Rejestracja - Medycyna Pracy')
    cy.contains('Wybierz usługę')

    cy.get('[data-cy=next-button-step4]').should('be.disabled')
    cy.get('[data-cy=lista-uslug]').within(() => {
      cy.get('.v-radio')
        .first()
        .click()
      cy.get('.v-radio')
        .first()
        .next()
        .click()
    })

    cy.get('[data-cy=next-button-step4]').should('not.be.disabled')
    cy.get('[data-cy=next-button-step4]').click()

    //PODSUMOWANIE
    cy.get('[data-cy=next-button-step5]').should('not.be.disabled')

    cy.server()
    cy.route({
      url: '/wizyty*',
      method: 'POST',
      status: 200
    }).as('wizyty')

    cy.get('[data-cy=next-button-step5]').click()
    cy.wait('@wizyty').then(response => {
      expect(response.status).to.eql(201)
    })

    cy.url().should('contain', '/success')
  })
})

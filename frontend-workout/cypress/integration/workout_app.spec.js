describe('Workout log app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://backend:3001/api/testing/reset')
    const user = {
      newUsername: 'yodaiam',
      newName: 'Yoda',
      newPassword: 'doordonot'
    }
    cy.request('POST', 'http://backend:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('SIGN IN')
    cy.contains('SIGN UP')
  })

  it('user can login with good credentials', function () {
    cy.contains('SIGN IN')
    cy.get('#username').type('yodaiam')
    cy.get('#password').type('doordonot')
    cy.get('#login-button').click()

    cy.contains('Log out')
  })

  it('login fails with wrong password', function () {
    cy.get('#username').type('yodaiam')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.errornotification')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')

    cy.get('html').should('not.contain', 'LOG OUT')


  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'yodaiam', password: 'doordonot' })
    })

    it('a new workout log can be created', function () {
      cy.contains('Add a new workout log')
      cy.get('#pickdate').type('2021-10-10')
      cy.get('#workoutdescription').type('a workout log created by cypress')
      cy.get('#add-button').click()
      cy.contains('a workout log created by cypress')
    })

    it('a workout log can be deleted', function () {
      cy.contains('Add a new workout log')
      cy.get('#pickdate').type('2021-10-10')
      cy.get('#workoutdescription').type('a workout log created by cypress to be deleted soon')
      cy.get('#add-button').click()
      cy.contains('a workout log created by cypress to be deleted soon')
      cy.contains('Delete').click()
      cy.get('html').should('not.contain', 'a workout log created by cypress to be deleted soon')
    })

    it('a specific workout log can be searched and found', function () {
      cy.contains('Add a new workout log')
      cy.get('#pickdate').type('2021-10-10')
      cy.get('#workoutdescription').type('Workout log 1')
      cy.get('#add-button').click()
      cy.get('html').should('contain', 'Workout log 1')

      cy.get('#pickdate').type('2021-11-10')
      cy.get('#workoutdescription').type('Workout log 2')
      cy.get('#add-button').click()
      cy.get('html').should('contain', 'Workout log 2')

      cy.contains('Delete').click()
      cy.get('html').should('not.contain', 'Workout log 1')
    })

    it('log out button works', function () {
      cy.get('#log-out-button').click()
      cy.contains('SIGN IN')
    })
  })
})
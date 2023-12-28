Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://backend:3001/api/login', {
        username, password
    }).then(({ body }) => {
        localStorage.setItem('loggedWorkoutappUser', JSON.stringify(body))
        cy.visit('http://localhost:3000')
    })
})

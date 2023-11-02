Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function (firstName, lastName, email, phone, text) {
    cy.get('input[name="firstName"]')
        .should('be.visible')
        .type(firstName)
        .should("have.value", firstName)

    cy.get('input[name="lastName"]')
        .should('be.visible')
        .type(lastName)
        .should('have.value', lastName)

    cy.get('input[id="email"]')
        .should('be.visible')
        .type(email)
        .should('have.value', email)

    if (phone) {
        cy.get('input[id="phone"]')
            .should('be.visible')
            .type(phone)
            .should('have.value', phone)
    }


    cy.get('textarea[name="open-text-area"]')
        .should('be.visible')
        .type(text)
        .should('have.value', text)

    cy.contains('button', 'Enviar')
        .should('be.visible')
        .click()

})
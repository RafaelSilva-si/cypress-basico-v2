/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function () {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e envia o formulário', function () {
        cy.fillMandatoryFieldsAndSubmit('Rafael', 'Silva', 'rafael@mail.com', '40028922', 'Testando TextArea')
        cy.get('.success').should('be.visible')
    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.fillMandatoryFieldsAndSubmit('Rafael', 'Silva', 'rafael@mail,com', '40028922', 'Testando TextArea')
        cy.get('.error').should('be.visible')
    })

    it('Campo De telefone deve receber somente números', function () {
        cy.get('input[id="phone"')
            .type('abcdefghij')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.fillMandatoryFieldsAndSubmit('Rafael', 'Silva', 'rafael@mail,com', null, 'Testando TextArea')
        cy.get('#phone-checkbox').check()

        cy.get('button[type="submit"]')
            .should('be.visible')
            .click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('input[name="firstName"]')
            .should('be.visible')
            .type("Rafael")
            .should("have.value", "Rafael")
            .clear()
            .should('have.value', '')

        cy.get('input[name="lastName"]')
            .should('be.visible')
            .type('Silva')
            .should('have.value', 'Silva')
            .clear()
            .should('have.value', '')

        cy.get('input[id="email"]')
            .should('be.visible')
            .type('rafael@mail.com')
            .should('have.value', 'rafael@mail.com')
            .clear()
            .should('have.value', '')

        cy.get('input[id="phone"')
            .type('40028922')
            .should('have.value', '40028922')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.get('button[type="submit"]')
            .should('be.visible')
            .click()

        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit('Rafael', 'Silva', 'rafael@mail.com', '40028922', 'Testando TextArea')
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function () {
        cy.get('select[id="product"]')
            .select(4)
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function () {
        cy.get('select[id="product"]')
            .select(3)
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function () {
        cy.get('select[id="product"]')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function () {
        cy.get('input[value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function () {
        cy.get('input[name="atendimento-tat"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check().should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('input[type="checkbox"]')
            .should('have.length', 2)
            .check()
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
})
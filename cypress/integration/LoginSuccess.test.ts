describe('Login Success', () => {
    it('successfully loads', () => {
        cy.intercept('POST', `https://frontend-challenge.screencloud-michael.now.sh/api/pin`, {
            statusCode: 200,
            body: {
                currentBalance: 200,
            }
        }).as('auth');
        cy.visit('/');
        cy.dataCy('pinpad-1').click();
        cy.dataCy('pinpad-2').click();
        cy.dataCy('pinpad-3').click();
        cy.dataCy('pinpad-4').click();
        cy.wait('@auth').then(({ response }) => {
            expect(response.statusCode).to.eq(200);
            expect(response.body.currentBalance).to.eq(200);
        });
        cy.dataCy('current-balance').should('have.text', 'Your current balance is £200');
    });
});

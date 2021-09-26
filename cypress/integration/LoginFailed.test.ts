describe('Login failed', () => {
    it('successfully loads', () => {
        cy.intercept('POST', `https://frontend-challenge.screencloud-michael.now.sh/api/pin`, {
            statusCode: 403,
            body: {
                error: 'Incorrect or missing PIN.',
            },
        }).as('auth');
        cy.visit('/');
        cy.dataCy('pinpad-1').click();
        cy.dataCy('pinpad-2').click();
        cy.dataCy('pinpad-3').click();
        cy.dataCy('pinpad-4').click();
        cy.wait('@auth').then(({ response }) => {
            expect(response.statusCode).to.eq(403);
            expect(response.body.currentBalance).to.eq(undefined);
        });
        cy.dataCy('login-auth-fail').should('have.text', 'You have enter the wrong pin number. Please try again');
    });
});

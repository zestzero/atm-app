describe('Out of service', () => {
    it('should return out of service screen when cannot connect to API', () => {
        cy.intercept('POST', `https://frontend-challenge.screencloud-michael.now.sh/api/pin`, {
            statusCode: 404,
        }).as('auth');
        cy.visit('/');
        cy.dataCy('pinpad-1').click();
        cy.dataCy('pinpad-2').click();
        cy.dataCy('pinpad-3').click();
        cy.dataCy('pinpad-4').click();
        cy.wait('@auth').then(({ response }) => {
            expect(response.statusCode).to.eq(404);
            expect(response.body.currentBalance).to.eq(undefined);
        });
        cy.dataCy('outofservice').should('be.visible');
    });
});

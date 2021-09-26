describe('Withdraw failed', () => {
    it('should warn user when withdraw more than machine amount', () => {
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
        cy.dataCy('numpad-5').click();
        cy.dataCy('numpad-0').click();
        cy.dataCy('numpad-0').click();
        cy.dataCy('numpad-enter').click();
        cy.dataCy('modal-message').should('have.text', 'This machine doesn\'t have sufficient amount of money.');
    });

    it('should warn user when withdraw more than user balance', () => {
        cy.intercept('POST', `https://frontend-challenge.screencloud-michael.now.sh/api/pin`, {
            statusCode: 200,
            body: {
                currentBalance: 10,
            }
        }).as('auth');
        cy.visit('/');
        cy.dataCy('pinpad-1').click();
        cy.dataCy('pinpad-2').click();
        cy.dataCy('pinpad-3').click();
        cy.dataCy('pinpad-4').click();
        cy.wait('@auth').then(({ response }) => {
            expect(response.statusCode).to.eq(200);
            expect(response.body.currentBalance).to.eq(10);
        });
        cy.dataCy('numpad-1').click();
        cy.dataCy('numpad-2').click();
        cy.dataCy('numpad-0').click();
        cy.dataCy('numpad-enter').click();
        cy.dataCy('modal-message').should('have.text', 'You do not have sufficient amount of money.');
    });
});

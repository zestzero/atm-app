describe('Withdraw Success', () => {
    it('should successfully loads', () => {
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
        cy.dataCy('numpad-1').click();
        cy.dataCy('numpad-4').click();
        cy.dataCy('numpad-0').click();
        cy.dataCy('numpad-enter').click();
        cy.dataCy('current-balance').should('have.text', 'Your current balance is £60');
        cy.dataCy('withdraw-amount').should('have.text', 'Withdrawing £140');
        cy.dataCy('withdraw-message').should('have.text', 'You should be receiving with the following notes.Please check before leaving!');
    });

    it('should warn user when overdrawn', () => {
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
        cy.dataCy('numpad-2').click();
        cy.dataCy('numpad-5').click();
        cy.dataCy('numpad-0').click();
        cy.dataCy('numpad-enter').click();
        cy.dataCy('overdrawn-confirm').click();
        cy.dataCy('current-balance').should('have.text', 'Your current balance is -£50');
        cy.dataCy('withdraw-amount').should('have.text', 'Withdrawing £250');
        cy.dataCy('withdraw-message').should('have.text', 'You should be receiving with the following notes.Please check before leaving!');
    });
});

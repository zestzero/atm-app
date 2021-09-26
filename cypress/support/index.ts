// Import commands.js using ES2015 syntax:
import './commands';

Cypress.Commands.add('dataCy', (value) => {
    return cy.get(`[data-cy=${value}]`);
});

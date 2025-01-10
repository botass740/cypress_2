const seats = require('../fixtures/seats.json');

describe('template spec', () => {
  it('passes', () => {
    cy.visit('/');
    cy.get('nav.page-nav > a').should('have.length', 7);
    cy.get('nav.page-nav > a:nth-of-type(3)').click();
    cy.get('.movie').first().contains('13:00').click();
    cy.contains('Забронировать').should('be.disabled');
    
    seats.forEach(({row, seat}) => {
      cy.get(`.buying-scheme :nth-child(${row}) > :nth-child(${seat})`).click();
    })
    
    /*cy.get('.buying-scheme :nth-child(4) > :nth-child(4)').click();
    cy.get('.buying-scheme :nth-child(5) > :nth-child(6)').click();
    cy.get('.buying-scheme :nth-child(3) > :nth-child(7)').click();
    cy.get('.buying-scheme :nth-child(5) > :nth-child(8)').click();*/
    cy.contains('Забронировать').should('not.be.disabled').click();
    cy.contains('Получить код бронирования')
    .should('be.visible')
    .should('not.be.disabled');
  })
})
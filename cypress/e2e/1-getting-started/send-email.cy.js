/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('Birthday reminders send email page', () => {
  beforeEach(() => {
    cy.visit('https://prisma-birthdays.vercel.app/send-email')
  })

  it('finds the Send email button', () => {
    cy.get('#email-trigger').should('have.length', 1)
    cy.get('#email-trigger').should('have.text', 'Send Emails ')
  })

  it('can click to send the email', () => {
    cy.contains('Send Emails ').click()
    cy.on('window:alert', (t) => {
      //assertions
      expect(t).to.contains('Emails successfully sent');
    })
  })
})


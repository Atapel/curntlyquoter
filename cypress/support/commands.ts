/// <reference types="cypress" />
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    launchNewConfig(): Chainable<any>;
  }
  interface Chainable<Subject = any> {
    login(
      email: string, 
      password: string): Chainable<any>;
  }
  interface Chainable<Subject = any> {
      addFrame(
        width: number,
        height: number,
        voltage: string,
        kaicRating: string,
        busRating: string,
        distributionService: string,
        feedType: string
      ): Chainable<any>;
    }
    interface Chainable<Subject = any> {
        addBreaker(
            breakerFrame: string, 
            breaker: string, 
            amp: string, 
            poles: string
        ): Chainable<any>;
      }
  }
Cypress.Commands.add('login', (email, password) => {
    cy.visit(`/auth`);

    cy.get('[data-testid="email-input"]').type(email);
    cy.get('[data-testid="password-input"]').type(password);
    cy.get('[data-testid="signin-button"]').click();
  })

Cypress.Commands.add(`launchNewConfig`, ()=>{
    cy.visit(`/`);
    const random = Math.floor(Math.random() * 1000);
    cy.get('[data-testid="project-input"]').type(`Test${random}`);
    cy.get('[data-testid="client-input"]').type(`Test${random}`);
    cy.get('[data-testid="launch-new-configuration-button"]').click();
})

Cypress.Commands.add(`addFrame`, (
    width,
    height,
    voltage,
    kaicRating,
    busRating,
    distributionService,
    feedType
    ) => {
    cy.get(`[data-testid="Dropdown-Width"]`).click();
    cy.get(`[data-testid="selection-${width}"]`).click()

    cy.get(`[data-testid="Dropdown-Height"]`).click();
    cy.get(`[data-testid="selection-${height}"]`).click()

    cy.get(`[data-testid="Dropdown-Voltage"]`).click();
    cy.get(`[data-testid="selection-${voltage}"]`).click()

    cy.get(`[data-testid="Dropdown-Kaic"]`).click();
    cy.get(`[data-testid="selection-${kaicRating}"]`).click()

    cy.get(`[data-testid="Dropdown-Bus"]`).click();
    cy.get(`[data-testid="selection-${busRating}"]`).click()
    
    cy.get(`[data-testid="Dropdown-DistService"]`).click();
    cy.get(`[data-testid="selection-${distributionService}"]`).click()

    cy.get(`[data-testid="Dropdown-Feed"]`).click();
    cy.get(`[data-testid="selection-${feedType}"]`).click()

    cy.get(`[data-testid="Add-Frame"]`).click();
  });


Cypress.Commands.add('addBreaker', (breakerFrame, breaker, amp, poles) => {
    cy.get(`[data-testid="Dropdown-BreakerFrame"]`).click();
    cy.get(`[data-testid="selection-${breakerFrame}"]`).click();
  
    cy.get(`[data-testid="Dropdown-Breaker"]`).click();
    cy.get(`[data-testid="selection-${breaker}"]`).click();
  
    cy.get(`[data-testid="Dropdown-Amp"]`).click();
    cy.get(`[data-testid="selection-${amp}"]`).click();
  
    cy.get(`[data-testid="Dropdown-Poles"]`).click();
    cy.get(`[data-testid="selection-${poles}"]`).click();

    cy.get(`[data-testid="Add-Breaker"]`).click();
  });

  
  
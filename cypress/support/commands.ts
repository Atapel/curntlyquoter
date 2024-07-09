/// <reference types="cypress" />
/// <reference types="cypress" />
interface IConfigSpecs {
  TestIdentifier: string;
  Width: number;
  Height: number;
  Voltage: string;
  Kaic: string;
  Bus: string;
  ServiceDistribution: string;
  FeedType: string;
  BreakerFrame: string;
  BreakerModel: string;
  BreakerAmp: string;
  BreakerPole: string;
}
declare namespace Cypress {
  interface Chainable<Subject = any> {
    launchNewConfig(
      testName: string
    ): Chainable<any>;
  }
  interface Chainable<Subject = any> {
    login(
      email: string, 
      password: string): Chainable<any>;
  }
  interface Chainable<Subject = any> {
      addFrame(
        ConfigSpecs: IConfigSpecs
      ): Chainable<any>;
    }
    interface Chainable<Subject = any> {
        addBreaker(
          ConfigSpecs: IConfigSpecs
        ): Chainable<any>;
      }
      interface Chainable<Subject = any> {
        saveConfig(): Chainable<any>;
      }
      interface Chainable<Subject = any> {
        checkConfigSpecsQuotationPage(
          ConfigSpecs: IConfigSpecs
        ): Chainable<any>;
      }
      interface Chainable<Subject = any> {
        checkConfigSpecsUserDashboard(
          ConfigSpecs: IConfigSpecs
        ): Chainable<any>;
      }
      interface Chainable<Subject = any> {
        checkPriceGenerator(
          // ConfigSpecs: IConfigSpecs
        ): Chainable<any>;
      }
  }
Cypress.Commands.add('login', (email, password) => {
  cy.session([email,password], () => {
    cy.intercept('/auth').as('authPage')
    cy.visit('/auth')
    cy.wait('@authPage')
    
    // cy.visit('/auth')
    cy.get('[data-testid="email-input"]').type(email);
    cy.get('[data-testid="password-input"]').type(password);
    cy.get('[data-testid="signin-button"]').click({timeout: 20000});
    cy.wait(5000)
    })   
  })

Cypress.Commands.add(`launchNewConfig`, (testName)=>{
  cy.intercept('/account').as('accountPage')
  cy.visit('/account')
  cy.wait('@accountPage')
  
  // cy.visit(`/account`);
    cy.get('[data-testid="project-input"]').type(testName);
    cy.get('[data-testid="client-input"]').type(testName);
    cy.get('[data-testid="launch-new-configuration-button"]').click({timeout: 20000});
    cy.wait(5000)
})

Cypress.Commands.add(`addFrame`, (ConfigSpecs) => {
    // cy.intercept('/configurator').as('configPage')
    // cy.visit('/configurator')
    // cy.wait('@configPage')

    cy.get(`[data-testid="Dropdown-Panel Width"]`).click();
    cy.get(`[data-testid="selection-${ConfigSpecs.Width}"]`).click()

    cy.get(`[data-testid="Dropdown-Panel Height"]`).click();
    cy.get(`[data-testid="selection-${ConfigSpecs.Height}"]`).click()

    cy.get(`[data-testid="Dropdown-Voltage"]`).click();
    cy.get(`[data-testid="selection-${ConfigSpecs.Voltage}"]`).click()

    cy.get(`[data-testid="Dropdown-Kaic"]`).click();
    cy.get(`[data-testid="selection-${ConfigSpecs.Kaic}"]`).click()

    cy.get(`[data-testid="Dropdown-Bus Rating"]`).click();
    cy.get(`[data-testid="selection-${ConfigSpecs.Bus}"]`).click()
    
    cy.get(`[data-testid="Dropdown-Distribution or Service"]`).click();
    cy.get(`[data-testid="selection-${ConfigSpecs.ServiceDistribution}"]`).click()

    cy.get(`[data-testid="Dropdown-Feed Type"]`).click();
    cy.get(`[data-testid="selection-${ConfigSpecs.FeedType}"]`).click()

    // if (feedPosition) {
    //   cy.get(`[data-testid="Dropdown-FeedPosition"]`).click();
    //   cy.get(`[data-testid="selection-${feedPosition}"]`).click()
    // }
    
    cy.get(`[data-testid="Add-Frame"]`).click();
  });


Cypress.Commands.add('addBreaker', (ConfigSpecs) => {
    cy.get(`[data-testid="Dropdown-Breaker Frame"]`).click();
    cy.get(`[data-testid="selection-${ConfigSpecs.BreakerFrame}"]`).click();
  
    cy.get(`[data-testid="Dropdown-Breaker"]`).click();
    cy.get(`[data-testid="selection-${ConfigSpecs.BreakerModel}"]`).click();
  
    cy.get(`[data-testid="Dropdown-Breaker Amperage"]`).click();
    cy.get(`[data-testid="selection-${ConfigSpecs.BreakerAmp}"]`).click();
  
    cy.get(`[data-testid="Dropdown-Breaker Poles"]`).click();
    cy.get(`[data-testid="selection-${ConfigSpecs.BreakerPole}"]`).click();

    cy.get(`[data-testid="Add-Breaker"]`).click();
  });

Cypress.Commands.add("saveConfig", ()=>{
  cy.get(`[data-testid="Save-Config"]`).click();
  cy.get(`[data-testid="Save-Config-Alert"]`).should("contain.text","Configuration saved successfully!");  
})

Cypress.Commands.add("checkConfigSpecsQuotationPage", (ConfigSpecs)=>{
  // FIX THIS NOOOOOOOOOOOW
  // cy.get(`[data-testid="Quotation-Page"]`).click();
  // Assertion Configuration Overview:
  
  cy.get(`[data-testid="${ConfigSpecs.TestIdentifier}-Width"]`).should("contain.text", ConfigSpecs.Width);
  cy.get(`[data-testid="${ConfigSpecs.TestIdentifier}-Height"]`).should("contain.text", ConfigSpecs.Height);
  cy.get(`[data-testid="${ConfigSpecs.TestIdentifier}-Voltage"]`).should("contain.text", ConfigSpecs.Voltage);
  cy.get(`[data-testid="${ConfigSpecs.TestIdentifier}-Kaic"]`).should("contain.text", ConfigSpecs.Kaic);
  cy.get(`[data-testid="${ConfigSpecs.TestIdentifier}-Bus"]`).should("contain.text", ConfigSpecs.Bus);
  cy.get(`[data-testid="${ConfigSpecs.TestIdentifier}-ServiceDistribution"]`).should("contain.text", ConfigSpecs.ServiceDistribution);
  cy.get(`[data-testid="${ConfigSpecs.TestIdentifier}-FeedType"]`).should("contain.text", ConfigSpecs.FeedType);

})

Cypress.Commands.add("checkPriceGenerator", ()=>{
  cy.get(`[data-testid="Price-Generator"]`).click();
  cy.wait(30000)
  cy.get(`[data-testid="Price-Display"]`).should('contain.text', /\d+/);
  
  // To test for the validity of the pricing formulas and 
  // get a specific sum, use the mthod bellow
  // cy.get(`[data-testid="Price-Display"]`).should('have.text', '99.99');

})

Cypress.Commands.add("checkConfigSpecsUserDashboard", (ConfigSpecs)=>{
  cy.visit(`/account`);
  
  cy.get(`[data-testid="${ConfigSpecs.TestIdentifier}-Width"]`).should("contain.text", ConfigSpecs.Width);
  cy.get(`[data-testid="${ConfigSpecs.TestIdentifier}-Voltage"]`).should("contain.text", ConfigSpecs.Voltage);
  cy.get(`[data-testid="${ConfigSpecs.TestIdentifier}-Kaic"]`).should("contain.text", ConfigSpecs.Kaic);
  cy.get(`[data-testid="${ConfigSpecs.TestIdentifier}-Bus"]`).should("contain.text", ConfigSpecs.Bus);
})
  
  
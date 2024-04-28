import "../support/commands"
describe('Config Test Draft', () => {
  const ConfigSpecs: IConfigSpecs = {
    TestIdentifier: `Test${Math.floor(Math.random() * 1000)}`,
    Width: 36,
    Height: 90,
    Voltage: "208Y/120V",
    Kaic: "100",
    Bus: "1500",
    ServiceDistribution: "Distribution",
    FeedType: "Main Breaker",
    BreakerFrame: "Single",
    BreakerModel: "UTS400",
    BreakerAmp: "250",
    BreakerPole: "2p"
  }
  beforeEach(() => {
    const email = Cypress.env("testUserEmail")
    const password = Cypress.env("testUserPassword")
    cy.login(email, password)
  })

  it('Completes a new configuration', () => {
    cy.wait(5000)
    cy.launchNewConfig(ConfigSpecs.TestIdentifier)
    cy.wait(5000)
    
    cy.addFrame(
      ConfigSpecs
    )
    
    cy.addBreaker(
      ConfigSpecs
    )

    cy.saveConfig()

    cy.checkConfigSpecsQuotationPage(ConfigSpecs)

    // cy.checkConfigSpecsUserDashboard(ConfigSpecs)

  })

  // it("Deletes a Config", () => {
  //   cy.wait(5000)
  //   cy.visit(`/account`);
  //   cy.get(`[data-testid="Delete-Config-${ConfigSpecs.TestIdentifier}"]`).click();
  //   cy.get(`[data-testid="Confirm-Delete-Config"]`).click();

  // })
})
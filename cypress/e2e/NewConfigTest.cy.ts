import "../support/commands"
import {selectableFrameOptions} from "../../app/configurator/assets/FrameSelectionOptions"
import {Breakers} from "../../app/configurator/assets/BreakerSelectionOptions"
describe('Config Test Draft', () => {
  let authCookie;

  it('Signing In', () => {
    
    cy.visit('http://localhost:3000/auth')

    const email = Cypress.env("testUserEmail")
    const password = Cypress.env("testUserPassword")

    cy.login(email, password)
    
    // cy.getCookie('sb-wnlbohioemzhzlhhknvy-auth-token').then(cookie => {
    //   authCookie = cookie;
    // })

    cy.wait(5000)

    cy.launchNewConfig()
    
    cy.wait(5000)

    // Iterate through every possible frame configuration
    cy.addFrame(
      36,
      90,
      "208Y/120V",
      "100",
      "1500",
      "Distribution",
      "Main Breaker",
    )

    // Iterate through every possible breaker configuration
    
    
    cy.addBreaker(
      "Single",
      "UTS400",
      "250",
      "2p"
    )

  })

})
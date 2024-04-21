import "../support/commands"
describe('Config Test Draft', () => {
  let authCookie;

  it('Signing In', () => {
    cy.visit('http://localhost:3000/auth')
    cy.get('[data-testid="email-input"]').type('kilian96@live.de');
    cy.get('[data-testid="password-input"]').type('Kilian96');
    cy.get('[data-testid="signin-button"]').click();
    
    cy.getCookie('sb-wnlbohioemzhzlhhknvy-auth-token').then(cookie => {
      authCookie = cookie;
    })

    cy.wait(5000)

    cy.launchNewConfig()
    
    cy.wait(5000)

    cy.addFrame(
      36,
      90,
      "120V",
      "100",
      "1500",
      "Distribution",
      "MainBreaker",
    )
    cy.addBreaker(
      "Single",
      "UTS400",
      "250",
      "2p"
    )

  })

})
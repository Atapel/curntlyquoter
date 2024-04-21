describe('Config Test Draft', () => {
  let authCookie;

  it('Signing In', () => {
    cy.visit('http://localhost:3000/auth')
    cy.get('[data-testid="email-input"]').type('kilian96@live.de');
    cy.get('[data-testid="password-input"]').type('Kilian96');
    cy.get('[data-testid="signin-button"]').click();
    // cy.getCookie('sb-wnlbohioemzhzlhhknvy-auth-token').then(cookie => {
    //   authCookie = cookie;
    // })
    cy.wait(1000)

    const random = Math.floor(Math.random() * 1000);
    cy.get('[data-testid="project-input"]').type(`Test${random}`);
    cy.get('[data-testid="client-input"]').type(`Test${random}`);
    cy.get('[data-testid="launch-new-configuration-button"]').click();

    cy.wait(1000)

    cy.get(`[data-testid="Dropdown-Width"]`).click();
    cy.get(`[data-testid="selection-36"]`).click()

    cy.get(`[data-testid="Dropdown-Height"]`).click();
    cy.get(`[data-testid="selection-90"]`).click()

    cy.get(`[data-testid="Dropdown-Voltage"]`).click();
    cy.get(`[data-testid="selection-120V"]`).click()

    cy.get(`[data-testid="Dropdown-Kaic"]`).click();
    cy.get(`[data-testid="selection-100"]`).click()

    cy.get(`[data-testid="Dropdown-Bus"]`).click();
    cy.get(`[data-testid="selection-1500"]`).click()
    
    cy.get(`[data-testid="Dropdown-DistService"]`).click();
    cy.get(`[data-testid="selection-Distribution"]`).click()

    cy.get(`[data-testid="Dropdown-Feed"]`).click();
    cy.get(`[data-testid="selection-MainBreaker"]`).click()

    cy.get(`[data-testid="Add-Frame"]`).click();

    cy.get(`[data-testid="Dropdown-BreakerFrame"]`).click();
    cy.get(`[data-testid="selection-Single"]`).click()

    cy.get(`[data-testid="Dropdown-Breaker"]`).click();
    cy.get(`[data-testid="selection-UTS400"]`).click()

    cy.get(`[data-testid="Dropdown-Amp"]`).click();
    cy.get(`[data-testid="selection-250"]`).click()

    cy.get(`[data-testid="Dropdown-Poles"]`).click();
    cy.get(`[data-testid="selection-2p"]`).click()

    cy.get(`[data-testid="Add-Breaker"]`).click();
  })

  // it("Launches Configurator", () => {
  //   cy.visit('http://localhost:3000/account')
  //   const random = Math.floor(Math.random() * 1000);
  //   cy.get('[data-testid="project-input"]').type(`Test${random}`);
  //   cy.get('[data-testid="client-input"]').type(`Test${random}`);
  //   cy.get('[data-testid="launch-new-configuration-button"]').click();
  // })

})

// Save Auth Token
// Make Each Possible frame combionation its own test

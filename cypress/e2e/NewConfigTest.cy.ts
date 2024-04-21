describe('Config Test Draft', () => {

  it('Signing In', () => {
    cy.visit('http://localhost:3000/auth')
    // Type email and password, then click the sign-in button
    cy.get('[data-testid="email-input"]').type('example@example.com');
    cy.get('[data-testid="password-input"]').type('password123');
    cy.get('[data-testid="signin-button"]').click();

  })

  // Check for Sign In form
  // Enter Credentials
  // Click Sign In
  // Check for Dashboard
  // Check for Start new Config section
  // Find new config forms
  // Enter random text into project and client fields
  // Click Launch Configurator Button
  // Check for Configurator
  // Check for Panel input dropdown selectors
  // Fill out all values in all possible combinations
  // Click add button
  // Check if SVG Graphics are getting rendered
  // Add all possible breakers combinations
  // Check if each breaker svg is being rendered correctly
  // Delete each breaker after having it selected
  // Check if breaker svg dissapears

})
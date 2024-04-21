describe("Signup Test", () => {
    it("should signup", () => {
    const randomPassword = `${Math.floor(Math.random() * 10000)}ABCxyz`

    cy.visit("http://localhost:3000/auth");
    cy.get("[data-testid=email-input]").type("");
    cy.get("input[name=password-input]").type(randomPassword);
    cy.get("input[name=repeat-password-input]").type(randomPassword);
    cy.get("button[type=submit]").click();
  });
  
})
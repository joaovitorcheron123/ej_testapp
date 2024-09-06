class Login {
  visit() {
    cy.visit('https://www.saucedemo.com/');
  }

  enterUsername(username) {
    cy.get('#user-name').type(username);
  }

  enterPassword(password) {
    cy.get('#password').type(password);
  }

  clickLogin() {
    cy.get('#login-button').click();
  }

  loginFunc(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLogin();
  }

  verifyLoginError() {
    cy.get('[data-test="error"]').should('be.visible');
  }

  logoutFunc() {
    cy.get('#react-burger-menu-btn').click();
    cy.get('#logout_sidebar_link').click();
  }
}

export default Login;

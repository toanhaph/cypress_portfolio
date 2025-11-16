describe('Login', () => {
    //Precondition
    const URL: string = "https://www.saucedemo.com";
    const correctUser = Cypress.env('correctUser') || process.env.correctUser;
    const correctPwd = Cypress.env('correctPwd') || process.env.correctPwd;
    const incorrectUser = Cypress.env('incorrectUser') || process.env.incorrectUser;
    const incorrectPwd = Cypress.env('incorrectPwd') || process.env.incorrectPwd;;
    const errorIncorrect: string = "Epic sadface: Username and password do not match any user in this service";
    const errorBlankUser: string = "Epic sadface: Username is required";
    const errorBlankPwd: string = "Epic sadface: Password is required";
    //Actions
    beforeEach(() => {
        cy.visit(URL);
        cy.get(".login_logo").should("contain", "Swag Labs");
    });
    it('Log in with correct user & password', () => {
        cy.get("#user-name").should('be.visible').type(correctUser);
        cy.get("#password").should('be.visible').type(correctPwd);
        cy.get("#login-button").should('be.visible').click();
        cy.get(".header_secondary_container").should('contain','Products');
        cy.get("#react-burger-menu-btn").should('be.visible').click();
        cy.get("#logout_sidebar_link").should('be.visible').click();
        cy.get("#login-button").should('be.visible');
    });
    it('Log in with incorrect user & password', () => {
        cy.get("#user-name").should('be.visible').type(incorrectUser);
        cy.get("#password").should('be.visible').type(incorrectPwd);
        cy.get("#login-button").should('be.visible').click();
        cy.get(".login-box").should('contain', errorIncorrect);
    });
    it('Log in with correct user & incorrect password', () => {
        cy.get("#user-name").should('be.visible').clear().type(correctUser);
        cy.get("#password").should('be.visible').clear().type(incorrectPwd);
        cy.get("#login-button").should('be.visible').click();
        cy.get(".login-box").should('contain', errorIncorrect);
    });
    it('Log in with incorrect user & correct password', () => {
        cy.get("#user-name").should('be.visible').type(incorrectUser);
        cy.get("#password").should('be.visible').type(correctPwd);
        cy.get("#login-button").should('be.visible').click();
        cy.get(".login-box").should('contain', errorIncorrect);
    });
    it('Log in without user', () => {
        cy.get("#password").should('be.visible').type(correctPwd);
        cy.get("#login-button").should('be.visible').click();
        cy.get(".login-box").should('contain', errorBlankUser);
    });
    it('Log in without password', () => {
        cy.get("#user-name").should('be.visible').type(correctUser);
        cy.get("#login-button").should('be.visible').click();
        cy.get(".login-box").should('contain', errorBlankPwd);
    });
    it('Log in without user & password', () => {
        cy.get("#login-button").should('be.visible').click();
        cy.get(".login-box").should('contain', errorBlankUser);
    });
})
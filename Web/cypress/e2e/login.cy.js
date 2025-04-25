/// <reference types="cypress" />

import { USERNAME_INPUT, PASSWORD_INPUT, LOGIN_BUTTON, USERNAME_DISPLAY } from '../../src/constants/test-ids';
import { testIdSelector } from '../util/test-ids';

describe('login page', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should load login page', () => {
        cy.get(testIdSelector(USERNAME_INPUT)).should('be.visible');
    });

    it('should successfully log in', () => {
        const username = 'peroperic';

        cy.intercept(
            {
                method: 'POST',
                url: '/api/auth/login',
            },
            {
                statusCode: 200,
                body: {
                    token: 'cypress fake JWT',
                    user: {
                        id: 123,
                        Username: username,
                        Password: 'jumbled hash',
                        Name: 'Pero',
                        Surname: 'Perić',
                        DateOfBirth: '2005-04-08T23:00:00.000Z',
                    },
                },
            },
        );

        cy.get(testIdSelector(USERNAME_INPUT)).type(username);
        cy.get(testIdSelector(PASSWORD_INPUT)).type(`pero1234`);
        cy.get(testIdSelector(LOGIN_BUTTON)).click();

        cy.get(testIdSelector(USERNAME_DISPLAY)).should('be.visible').and('have.text', username);
    });

    it('should fail to login for wrong credentials', () => {
        cy.intercept(
            {
                method: 'POST',
                url: '/api/auth/login',
            },
            {
                statusCode: 400,
                body: { message: 'Bad credentials' },
            },
        );

        cy.get(testIdSelector(USERNAME_INPUT)).type('anaanic');
        cy.get(testIdSelector(PASSWORD_INPUT)).type(`sdrfgeinf34`);
        cy.get(testIdSelector(LOGIN_BUTTON)).click();

        cy.get('body').should('contain.text', 'Wrong Username or Password!');
    });
});

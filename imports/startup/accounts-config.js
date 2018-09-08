import { Accounts } from 'meteor/accounts-base';
import { AccountsReact } from 'meteor/meteoreact:accounts';

Accounts.config({
    forbidClientAccountCreation: false,
});

AccountsReact.configure({
    defaultState: 'signIn',
    passwordSignupFields: 'USERNAME_ONLY',
});

if (Meteor.isClient) {
    Accounts.ui.config({
        passwordSignupFields: 'USERNAME_ONLY',
    });
}

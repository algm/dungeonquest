import { Accounts } from "meteor/accounts-base";

/*Accounts.config({
});*/

Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});

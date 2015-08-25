Ext.define('Spm.view.login.LoginDialogViewModel', {
        extend: 'Spm.component.StandardDialogViewModel',
        alias: 'viewmodel.loginDialog',

        data: {
            acceptButtonText: 'Login',
            cancelButtonText: 'Reset',

            login: {}
        },

        formulas: {
            acceptButtonDefaultDisabled: {
                bind: {
                    username: '{login.username}',
                    password: '{login.password}'
                },
                get: function (login) {
                    return !login.username || !login.password;
                }
            }
        }
    }
);
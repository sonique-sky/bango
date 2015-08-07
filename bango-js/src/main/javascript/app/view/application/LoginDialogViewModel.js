Ext.define('Spm.view.application.LoginDialogViewModel', {
        extend: 'Spm.view.component.StandardDialogViewModel',
        alias: 'viewmodel.loginDialog',

        data: {
            acceptButtonText: 'Login',
            cancelButtonText: 'Reset',

            username: null,
            password: null
        },

        formulas: {
            acceptButtonDefaultDisabled: {
                get: function (get) {
                    var username = get('username');
                    var password = get('password');

                    return username == null || username == '' || password == null || password == '';
                }
            }
        }
    }
);
Ext.define('Spm.controller.Login', {
    extend: 'Ext.app.Controller',
    alias: 'controller.login',

    onSpecialKey: function (field, e, eOpts) {
        if (e.getKey() == e.ENTER) {
            this.doLogin(field.up('form').getForm());
        }
    },

    onLoginClick: function (button, e, eOpts) {
        this.doLogin(button.up('form').getForm());

    },

    onResetClick: function (button, e, eOpts) {
        button.up('form').getForm().reset();
    },

    doLogin: function (form) {
        if (form.isValid()) {
            Spm.application.fireEvent('performAuthentication', {'username': form.findField('username').getValue(), 'password': form.findField('password').getValue()});
        }
    },

    init: function (application) {
        this.control({
            "textfield": {
                specialkey: this.onSpecialKey
            },
            "button#login-button": {
                click: this.onLoginClick
            },
            "button#reset-button": {
                click: this.onResetClick
            }
        });
    }

});

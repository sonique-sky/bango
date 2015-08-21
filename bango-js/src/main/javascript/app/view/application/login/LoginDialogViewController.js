Ext.define('Spm.view.application.login.LoginDialogViewController', {
    extend: 'Spm.view.component.StandardDialogViewController',
    alias: 'controller.loginDialog',

    onAccept: function () {
        if (this.lookupReference('loginForm').isValid()) {
            var viewModel = this.getViewModel();
            this.fireEvent('performAuthentication', viewModel.get('login'));
            this.getView().close();
        }
    },

    onCancel: function () {
        this.lookupReference('loginForm').reset();
    }
});
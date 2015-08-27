Ext.define('Spm.view.login.LoginDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.loginDialog',

    onAccept: function () {
        if (this.lookupReference('loginForm').isValid()) {
            var viewModel = this.getViewModel();
            this.fireEvent('performAuthentication', viewModel.login());
            this.getView().close();
        }
    },

    onCancel: function () {
        this.lookupReference('loginForm').reset();
    }
});
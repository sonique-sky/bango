Ext.define('Spm.view.login.LoginDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.loginDialog',

    onAccept: function () {
        var me = this;
        if (me.lookupReference('loginForm').isValid()) {
            var viewModel = me.getViewModel();
            me.fireEvent('performAuthentication', viewModel.login());
            me.closeView();
        }
    },

    onCancel: function () {
        this.lookupReference('loginForm').reset();
    }
});
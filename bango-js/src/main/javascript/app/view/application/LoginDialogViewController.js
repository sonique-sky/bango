Ext.define('Spm.view.application.LoginDialogViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.loginDialog',

    onSpecialKey: function (field, e) {
        if (e.getKey() === e.ENTER) {
            this.onAccept();
        }
    },

    onAccept: function () {
        if (this.lookupReference('loginForm').isValid()) {
            var viewModel = this.getViewModel();
            this.fireEvent('performAuthentication', {
                username: viewModel.get('username'),
                password: viewModel.get('password')
            });
            this.getView().close();
        }
    },

    onCancel: function () {
        var viewModel = this.getViewModel();
        viewModel.set('username', null);
        viewModel.set('password', null);

        this.lookupReference('loginForm').reset();
    }

});
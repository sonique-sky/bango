Ext.define('Spm.view.component.dialog.StandardDialogViewController', {
    alternateClassName: 'Spm.component.StandardDialogViewController',
    extend: 'Ext.app.ViewController',
    alias: 'controller.standardDialog',

    submitOnEnter: function (field, e) {
        if (e.getKey() === e.ENTER && !this.getViewModel().get('acceptButtonDefaultDisabled')) {
            this.onAccept();
        }
    },

    onCancel: function () {
        this.getView().close();
    }

});
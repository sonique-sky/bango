Ext.define('Spm.view.component.dialog.StandardDialogViewController', {
    alternateClassName: 'Spm.component.StandardDialogViewController',
    extend: 'Ext.app.ViewController',
    alias: 'controller.standardDialog',

    submitOnEnter: function (field, e) {
        if (e.getKey() === e.ENTER && this.getViewModel().acceptEnabled()) {
            this.onAccept();
        } else if (e.getKey() === e.ESC) {
            this.onCancel();
        }
    },

    onCancel: function () {
        this.closeView();
    }

});
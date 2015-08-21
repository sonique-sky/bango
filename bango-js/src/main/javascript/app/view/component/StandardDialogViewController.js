Ext.define('Spm.view.component.StandardDialogViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.standardDialog',

    submitOnEnter: function (field, e) {
        if (e.getKey() === e.ENTER) {
            this.onAccept();
        }
    },

    onCancel: function() {
        this.getView().close();
    }

});
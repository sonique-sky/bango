Ext.define('Spm.view.component.StandardDialogViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.standardDialog',

    onCancel: function() {
        this.close();
    }

});
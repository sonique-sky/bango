Ext.define('Spm.view.queue.BulkClearDialogViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.bulkClearDialog',

    onCancel: function () {
        this.getView().close();
    },

    onAccept: function () {

    }
});
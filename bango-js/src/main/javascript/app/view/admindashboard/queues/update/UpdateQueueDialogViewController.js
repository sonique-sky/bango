Ext.define('Spm.view.admindashboard.queues.update.UpdateQueueDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.updateQueueDialog',

    requires: [
        'Ext.window.MessageBox'
    ],

    onShow: function () {
    },

    onAccept: function () {
        var me = this;
        this.getViewModel().queue().save({
            success: function (record, operation) {
                me.getView().close();
            }
        });
    },

    onCancel: function () {
        this.getViewModel().queue().reject();
        this.callParent();
    }

});
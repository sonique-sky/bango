Ext.define('Spm.view.admindashboard.queues.update.UpdateQueueDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.updateQueueDialog',

    onSpecialKey: function (field, e) {
        if (e.getKey() === e.ENTER) {
            this.onAccept();
        } else if (e.getKey() === e.ESC) {
            this.onCancel();
        }
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
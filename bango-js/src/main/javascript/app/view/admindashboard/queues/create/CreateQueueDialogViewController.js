Ext.define('Spm.view.admindashboard.queues.create.CreateQueueDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.createQueueDialog',

    onSpecialKey: function (field, e) {
        if (e.getKey() === e.ENTER) {
            this.onAccept();
        } else if (e.getKey() === e.ESC) {
            this.onCancel();
        }
    },

    onShow: function () {
        this.getViewModel().set('queue', Ext.create('Spm.model.Queue'))
    },

    onAccept: function () {
        var me = this;
        this.getViewModel().queue().save({
            success: function (record, operation) {
                me.getView().close();
            }
        });
    }

});
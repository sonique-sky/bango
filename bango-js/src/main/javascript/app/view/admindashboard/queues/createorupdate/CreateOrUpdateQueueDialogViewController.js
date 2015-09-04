Ext.define('Spm.view.admindashboard.queues.createorupdate.CreateOrUpdateQueueDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.createOrUpdateQueueDialog',

    onAccept: function () {
        var me = this;
        var newQueue = this.getViewModel().queue();
        var queuesStore = this.getViewModel().get('queues');

        queuesStore.add(newQueue);
        queuesStore.sync({
            success: function () {
                me.fireEvent('queueAdded', queuesStore);
                me.getView().close();
            },
            failure: function () {
                queuesStore.rejectChanges();
            }
        });
    },

    onCancel: function () {
        this.getViewModel().get('queues').rejectChanges();
        this.callParent();
    }

});
Ext.define('Spm.view.dashboard.admin.queues.createorupdate.CreateOrUpdateQueueDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.createOrUpdateQueueDialog',

    initViewModel: function (viewModel) {
        viewModel.set('queue', this.getView().queue)
    },

    onAccept: function () {
        var me = this,
            newQueue = me.getViewModel().queue(),
            queuesStore = me.getViewModel().get('queues');

        queuesStore.add(newQueue);

        queuesStore.sync({
            success: function () {
                me.fireEvent('queueAdded', queuesStore);
                me.closeView();
            },
            failure: queuesStore.rejectChanges
        });
    },

    onCancel: function () {
        this.getViewModel().get('queues').rejectChanges();
        this.callParent();
    }

});

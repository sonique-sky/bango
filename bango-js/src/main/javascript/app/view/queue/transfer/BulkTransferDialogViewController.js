Ext.define('Spm.view.queue.transfer.BulkTransferDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.bulkTransferDialog',

    onShow: function () {
        this.getViewModel().getStore('allQueues').load();
    },

    onTransferQueueSelected: function (selectionModel, transferQueue) {
        this.getViewModel().set('transferQueue', transferQueue);
    },

    onAllQueuesLoaded: function () {
        var queueId = this.getViewModel().originalQueueId();
        var store = this.getViewModel().getStore('allQueues');

        store.clearFilter();
        store.filter([
            {property: 'id', operator: '!=', value: queueId}
        ]);
    },

    onAccept: function () {
        var me = this;

        Ext.Ajax.request({
            url: 'api/queue/bulkTransfer',
            jsonData: me.getViewModel().transferData(),
            success: function (response) {
                me.fireEvent('bulkOperationCompleted', response);
                me.getView().close();
            }
        });
    }
});

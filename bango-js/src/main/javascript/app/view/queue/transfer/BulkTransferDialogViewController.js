Ext.define('Spm.view.queue.transfer.BulkTransferDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.bulkTransferDialog',

    onShow: function () {
        this.getViewModel().getStore('queues').load();
    },

    onTransferQueueSelected: function (selectionModel, transferQueue) {
        this.getViewModel().set('transferQueue', transferQueue);
    },

    onAllQueuesLoaded: function () {
        var queueId = this.getViewModel().originalQueueId();
        var store = this.getViewModel().getStore('queues');

        store.filterBy(function (queue) {
            return queue.id != queueId;
        });
    },

    onAccept: function () {
        var me = this;

        Ext.Ajax.request({
            url: 'api/queue/bulkTransfer',
            jsonData: me.getViewModel().transferData(),
            success: function (response) {
                me.fireEvent('bulkOperationCompleted', response);
                me.closeView();
            }
        });
    }
});

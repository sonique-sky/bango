Ext.define('Spm.view.queue.BulkTransferDialogViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.bulkTransferDialog',

    listen: {
        component: {
            'bulkTransferDialog': {
                show: 'onShow'
            }
        }
    },

    onTransferQueueSelected: function (transferQueue) {
        this.getViewModel().set('transferQueue', transferQueue);
    },

    onAllQueuesLoaded: function () {
        var queueId = this.getViewModel().get('queue').get('id');
        var store = this.getViewModel().getStore('allQueues');

        store.clearFilter();
        store.filter([
            {property: 'id', operator: '!=', value: queueId}
        ]);
    },

    onShow: function () {
        this.getViewModel().getStore('allQueues').load();
    }
});
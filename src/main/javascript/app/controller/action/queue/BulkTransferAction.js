Ext.define('Spm.controller.action.queue.BulkTransferAction', {
    extend: 'Spm.controller.action.queue.BaseBulkAction',

    requires: [
        'Spm.view.queue.BulkTransferDialog'
    ],

    constructor: function () {
        this.callParent([Ext.apply({}, {
            name: 'bulk-transfer'
        })]);
    },

    startAction: function (queueTab) {
        var queueId = queueTab.getQueue().queueId();
        var store = Ext.data.StoreManager.lookup('AllQueues');
        store.load(
                {
                    callback: function (records, operation, success) {
                        if (success) {
                            store.clearFilter();
                            store.filter([
                                {property: 'id', operator: '!=', value: queueId}
                            ]);
                        }
                    }
                }
        );

        Ext.create('Spm.view.queue.BulkTransferDialog', {parentQueueTab: queueTab}).show();
    },

    finishAction: function (queueTab, destinationQueue) {
        var serviceProblemIds = this.selectedServiceProblemIds(queueTab);

        this.performBulkOperation('bulk-transfer', {
            'originalQueueId': queueTab.getQueue().queueId(),
            'destinationQueueId': destinationQueue.queueId(),
            'serviceProblemIds': serviceProblemIds
        }, queueTab);
    }
});
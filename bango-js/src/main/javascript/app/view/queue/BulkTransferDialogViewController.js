Ext.define('Spm.view.queue.BulkTransferDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.bulkTransferDialog',

    listen: {
        component: {
            'bulkTransferDialog': {
                show: 'onShow'
            }
        }
    },

    onTransferQueueSelected: function (selectionModel, transferQueue) {
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
    },

    onAccept: function () {
        var me = this;
        var viewModel = this.getViewModel();
        var serviceProblems = viewModel.get('serviceProblems');
        var originalQueueId = viewModel.get('queue').get('id');
        var destinationQueueId = viewModel.get('transferQueue').get('id');

        var serviceProblemIds =
            Ext.Array.map(
                serviceProblems,
                function (serviceProblem) {
                    return serviceProblem.serviceProblemId();
                }
            );

        Ext.Ajax.request(
            {
                url: 'api/queue/bulkTransfer',
                jsonData: {
                    'originalQueueId': originalQueueId,
                    'destinationQueueId': destinationQueueId,
                    'serviceProblemIds': serviceProblemIds
                },
                success: function (response) {
                    me.fireEvent('bulkOperationCompleted', response);
                    me.getView().close();
                }
            }
        );
    }
});
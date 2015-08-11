Ext.define('Spm.view.queue.BulkClearDialogViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.bulkClearDialog',

    onCancel: function () {
        this.getView().close();
    },

    onAccept: function () {
        var me = this;
        var viewModel = this.getViewModel();
        var serviceProblems = viewModel.get('serviceProblems');
        var queueId = viewModel.get('queue').get('id');

        var serviceProblemIds =
            Ext.Array.map(
                serviceProblems,
                function (serviceProblem) {
                    return serviceProblem.serviceProblemId();
                }
            );

        Ext.Ajax.request(
            {
                url: 'api/queue/bulkClear',
                jsonData: {
                    'originalQueueId': queueId,
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
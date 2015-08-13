Ext.define('Spm.view.serviceproblem.eventhistory.AddNoteDialogViewController', {
    extend: 'Spm.view.component.StandardDialogViewController',
    alias: 'controller.addNoteDialog',

    onAccept: function () {
        console.log(this.getViewModel().get('noteText'));
        //var me = this;
        //var viewModel = this.getViewModel();
        //var serviceProblems = viewModel.get('serviceProblems');
        //var originalQueueId = viewModel.get('queue').get('id');
        //var destinationQueueId = viewModel.get('transferQueue').get('id');
        //
        //var serviceProblemIds =
        //    Ext.Array.map(
        //        serviceProblems,
        //        function (serviceProblem) {
        //            return serviceProblem.serviceProblemId();
        //        }
        //    );
        //
        //Ext.Ajax.request(
        //    {
        //        url: 'api/queue/bulkTransfer',
        //        jsonData: {
        //            'originalQueueId': originalQueueId,
        //            'destinationQueueId': destinationQueueId,
        //            'serviceProblemIds': serviceProblemIds
        //        },
        //        success: function (response) {
        //            me.fireEvent('bulkOperationCompleted', response);
        //            me.getView().close();
        //        }
        //    }
        //);
    }
})
;
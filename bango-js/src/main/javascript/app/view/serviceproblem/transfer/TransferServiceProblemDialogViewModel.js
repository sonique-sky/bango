Ext.define('Spm.view.serviceproblem.transfer.TransferServiceProblemDialogViewModel', {
    extend: 'Spm.component.StandardDialogViewModel',
    alias: 'viewmodel.transferServiceProblemDialog',

    data: {
        transferType: null
    },

    stores: {
        queues: {
            type: 'queues',
            autoLoad: false,
            pageSize: 0,
            listeners: {
                load: 'selectFirstRow'
            }
        }
    },

    serviceProblemId: function () {
        return this.get('serviceProblem').serviceProblemId();
    },

    currentQueueId: function () {
        return this.get('serviceProblem').queue().queueId();
    },

    transferType: function () {
        return this.get('transferType');
    }

});

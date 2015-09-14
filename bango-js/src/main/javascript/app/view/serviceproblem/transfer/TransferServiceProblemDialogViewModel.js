Ext.define('Spm.view.serviceproblem.transfer.TransferServiceProblemDialogViewModel', {
    extend: 'Spm.component.StandardDialogViewModel',
    alias: 'viewmodel.transferServiceProblemDialog',

    data: {
        transferType: null,
        queueId: null
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
        return this.get('serviceProblemId');
    },

    transferType: function () {
        return this.get('transferType');
    },

    queueId: function () {
        return this.get('queueId');
    }

});

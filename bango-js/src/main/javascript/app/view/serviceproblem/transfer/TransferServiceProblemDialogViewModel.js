Ext.define('Spm.view.serviceproblem.transfer.TransferServiceProblemDialogViewModel', {
    extend: 'Spm.component.StandardDialogViewModel',
    alias: 'viewmodel.transferServiceProblemDialog',

    data: {
        transferType: null,
        newQueue: null
    },

    stores: {
        queues: {
            type: 'queues',
            autoLoad: 'true'
        }
    }
});

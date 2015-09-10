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
            proxy: {
                type: 'rest',
                appendId: true,
                url: 'api/queue/transferable',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            },
            autoLoad: false,
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

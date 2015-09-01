Ext.define('Spm.view.queue.transfer.BulkTransferDialogViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.bulkTransferDialog',

    stores: {
        queues: {
            type: 'queues',
            listeners: {
                load: 'onAllQueuesLoaded'
            }
        }
    },

    data: {
        acceptButtonText: 'Transfer',
        cancelButtonText: 'Cancel',
        transferQueue: null
    },

    formulas: {
        acceptButtonDefaultDisabled: {
            get: function (get) {
                return null === get('transferQueue');
            }
        }
    },

    originalQueueId: function() {
        return this.get('queue').get('id');
    },

    transferData: function () {
        return {
            originalQueueId: this.originalQueueId(),
            destinationQueueId: this.get('transferQueue').get('id'),
            serviceProblemIds: this.get('serviceProblemIds')
        }
    }
});


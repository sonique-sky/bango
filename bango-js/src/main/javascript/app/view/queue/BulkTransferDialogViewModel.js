Ext.define('Spm.view.queue.BulkTransferDialogViewModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.bulkTransferDialog',

    stores: {
        allQueues: {
            type: 'allQueues',
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
    }
});

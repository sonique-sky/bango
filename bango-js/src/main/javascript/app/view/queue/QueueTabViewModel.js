Ext.define('Spm.view.queue.QueueTabViewModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.queueTab',

    requires: [
        'Spm.store.ServiceProblems'
    ],
    stores: {
        queuedServiceProblems: {
            type: 'serviceProblems'
        }
    },

    data: {
        queue: null,
        bulkTransferDisabled: true,
        bulkClearDisabled: true
    },

    queueId: function() {
        return this.get('queue').get('id');
    }
});

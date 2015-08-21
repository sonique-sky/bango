Ext.define('Spm.view.queue.QueueTabViewModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.queueTab',

    stores: {
        queuedServiceProblems: {
            type: 'queuedServiceProblems',
            listeners: {
                beforeload: 'onBeforeLoad'
            }
        }
    },

    data: {
        queue: null,
        bulkTransferDisabled: true,
        bulkClearDisabled: true
    }
});

Ext.define('Spm.view.queue.QueueTabViewModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.queueTab',

    stores: {
        serviceProblems: {
            type: ''
        }
    },

    data: {
        queue: null
    }
});

Ext.define('Spm.view.queue.QueueTabViewModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.queueTab',

    stores: {
        queuedServiceProblems: {
            type: 'queuedServiceProblems',
            listeners: {
                beforeLoad: 'onBeforeLoad'
            }
        }
    },

    data: {
        queue: null
    }

});

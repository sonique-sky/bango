Ext.define('Spm.view.admindashboard.queues.QueueAdminTabViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.queueAdminTab',

    stores: {
        allQueues: {
            type: 'allQueues',
            listeners: {
                load: 'onQueueStoreLoaded'
            }
        }
    }
});
Ext.define('Spm.view.admindashboard.queues.QueueAdminTabViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.queueAdminTab',

    stores: {
        queues: {
            type: 'queues',
            listeners: {
                load: 'onQueueStoreLoaded'
            }
        }
    }
});
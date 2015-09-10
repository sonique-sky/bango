Ext.define('Spm.view.dashboard.admin.queues.QueueAdminTabViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.queueAdminTab',

    stores: {
        queues: {
            type: 'queues',
            autoSync: false,
            remoteSort: true,
            listeners: {
                load: 'selectFirstRow'
            }
        }
    }

});
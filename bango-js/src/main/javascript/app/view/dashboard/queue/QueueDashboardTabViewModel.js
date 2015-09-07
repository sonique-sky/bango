Ext.define('Spm.view.dashboard.queue.QueueDashboardTabViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.queueDashboard',

    stores: {
        queueDashboardEntries: {
            model: 'Spm.model.QueueDashboardEntry',

            proxy: {
                type: 'ajax',
                url: 'api/queueDashboard',
                reader: {
                    type: 'json',
                    rootProperty: 'onePageOfSearchResults'
                }
            }
        }
    }
});

Ext.define('Spm.view.dashboard.queue.QueueDashboardTabViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.queueDashboard',

    stores: {
        queueDashboardEntries: {
            fields: [
                'queueId',
                'queueName',
                'oldestServiceProblemDate',
                'serviceProblemCount',
                'slaExpiresInMoreThan12Hours',
                'slaExpiresInLessThan12Hours',
                'slaExpiredLessThanADayAgo',
                'slaExpiredBetween1And4DaysAgo',
                'slaExpiredMoreThan4DaysAgo',
                {name: 'oldestServiceProblemDate', type: 'date', dateFormat: 'd/m/Y H:i:s'},
                'noWorkItem',
                'assignedPull',
                'assignedPush',
                'unassignedPull',
                'unassignedPush'
            ],
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: 'api/dashboard/queue',
                reader: {
                    type: 'json',
                    rootProperty: 'onePageOfSearchResults'
                }
            }
        }
    }
});


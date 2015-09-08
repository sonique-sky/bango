Ext.define('Spm.view.dashboard.queue.QueueDashboardTabViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.queueDashboard',

    stores: {
        queueDashboardEntries: {
            fields: [
                {
                    name: 'queueId'
                },
                {
                    name: 'queueName'
                },
                {
                    name: 'oldestServiceProblemDate'
                },
                {
                    name: 'serviceProblemCount'
                },
                {
                    name: 'slaExpiresInMoreThan12Hours'
                },
                {
                    name: 'slaExpiresInLessThan12Hours'
                },
                {
                    name: 'slaExpiredLessThanADayAgo'
                },
                {
                    name: 'slaExpiredBetween1And4DaysAgo'
                },
                {
                    name: 'slaExpiredMoreThan4DaysAgo'
                },
                {
                    name: 'oldestServiceProblemDate',
                    type: 'date',
                    dateFormat: 'd/m/Y H:i:s'
                },
                {
                    name: 'noWorkItem'
                },
                {
                    name: 'assignedPull'
                },
                {
                    name: 'assignedPush'
                },
                {
                    name: 'unassignedPull'
                },
                {
                    name: 'unassignedPush'
                }
            ],

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

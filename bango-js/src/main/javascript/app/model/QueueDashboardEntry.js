Ext.define('Spm.model.QueueDashboardEntry', {
    extend: 'Ext.data.Model',
    alias: 'model.queueDashboardEntry',

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

    queue: function() {
        return new Spm.model.Queue({id: this.get('queueId'), name: this.get('queueName')});
    }
});
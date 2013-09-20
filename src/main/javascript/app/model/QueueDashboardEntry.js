Ext.define('Spm.model.QueueDashboardEntry', {
    extend: 'Ext.data.Model',
    alias: 'model.queueDashboardEntry',

    fields: [
        {
            name: 'serviceProblemCount'
        },
        {
            name: 'slaExpiresInMoreThan12Hours'
        },
        {
            name: 'slaExpiryLtTwelveHours'
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
            dateFormat: 'd/m/Y H:i'
        },
        {
            name: 'noWorkItemCount'
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

    hasOne: [
        'queue', {model: 'Spm.model.Queue', name: 'queue', associationKey: 'queue', getterName: 'queue'}
    ]
});
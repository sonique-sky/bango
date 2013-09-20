Ext.define('Spm.proxy.QueueDashboardEntryApiProxy', {
    extend: 'Spm.proxy.ApiProxy',

    singleton: true,

    model: 'Spm.model.QueueDashboardEntry',

    requires: [
        'Spm.model.QueueDashboardEntry'
    ]
});
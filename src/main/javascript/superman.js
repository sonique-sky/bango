//@require @packageOverrides
Ext.Loader.setConfig({
    enabled: true,
    disableCaching: true
});

Ext.require('Spm.view.application.SpmViewport');

Ext.application({
    name: 'Spm',
    controllers: [
        'Errors',
        'MyQueues',
        'MyStatus',
        'Security',
        'Queues',
        'ServiceProblems',
        'Searches',
        'MyItems',
        'QueueDashboard'
    ],
    requires: [
            'Spm.overrides.AbstractStore'
    ],

    launch: function () {
        Ext.create('Spm.view.application.SpmViewport', {agentStatusActionContextManager: this.getMyStatusController()});
    }
});

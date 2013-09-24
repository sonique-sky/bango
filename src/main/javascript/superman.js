//@require @packageOverrides
Ext.Loader.setConfig({
    enabled: true,
    disableCaching: true
});

Ext.require('Spm.view.application.SpmViewport');

Ext.application({
    name: 'Spm',
    paths: {
        'Ext.ux.window': 'app/thirdparty'
    },
    requires: [
        'Spm.overrides.AbstractStore'
    ],
    controllers: [
        'Errors',
        'MyQueues',
        'AgentStatus',
        'Security',
        'Queues',
        'ServiceProblems',
        'Searches',
        'MyItems',
        'QueueDashboard'
    ],

    launch: function () {
        Ext.create('Spm.view.application.SpmViewport', {
            agentStatusActionContextManager: this.getAgentStatusController(),
            searchesActionContextManager: this.getSearchesController()
        });
    }
});

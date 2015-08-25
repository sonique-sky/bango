/*
 This file is generated and updated by Sencha Cmd. You can edit this file as
 needed for your application, but these edits will have to be merged by
 Sencha Cmd when upgrading.
 */
//@require @packageOverrides
Ext.Loader.setConfig({
    enabled: true,
    disableCaching: true
});

Ext.application({
    name: 'Spm',
    paths: {
        'Ext.ux.window': 'app/thirdparty',
        'Ext.ux': 'app/ux'
    },
    requires: [
        'Spm.overrides.AbstractStore',
        'Spm.view.Superman'
    ],
    controllers: [
        'Errors',
        //'MyQueues',
        //'AgentStatus',
        //'Security',
        //'Queues',
        //'ServiceProblems',
        'Searches',
        //'MyItems',
        'QueueDashboard'
    ],

    launch: function () {
        Ext.create('Spm.view.Superman'
            //    , {
            //    agentStatusActionContextManager: this.getAgentStatusController(),
            //    searchesActionContextManager: this.getSearchesController()
            //}
        );
    }
});

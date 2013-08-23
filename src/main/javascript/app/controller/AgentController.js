Ext.define('Spm.controller.AgentController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.agentController',

    models: [
        'Agent'
    ],
    stores: [
        'AuthenticatedAgent',
        'QueueStore'
    ],
    views: [
        'AgentStatusPanel'
    ],

    refs: [
        {
            ref: 'agentStatusPanel',
            selector: 'agentStatusPanel',
            xtype: 'agentStatusPanel'
        }
    ],

    onToggleAvailability: function() {
        var me = this;

        Ext.Ajax.request({
            url: 'api/agent/toggleAvailability',
            success: function(response) {
                me.getAuthenticatedAgentStore().loadRawData(response);
            }
        });
    },

    init: function(application) {
        application.on({
            toggleAvailability: {
                fn: this.onToggleAvailability,
                scope: this
            }
        });
    }

});

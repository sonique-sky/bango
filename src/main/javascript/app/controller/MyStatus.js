Ext.define('Spm.controller.MyStatus', {
    extend: 'Ext.app.Controller',
    alias: 'controller.myStatus',

    models: [
        'Agent'
    ],
    stores: [
        'AuthenticatedAgent',
        'AgentQueues',
        'AgentState'
    ],
    views: [
        'navigation.AgentStatusPanel'
    ],

    refs: [
        {
            ref: 'agentStatusPanel',
            selector: 'agentStatusPanel',
            xtype: 'agentStatusPanel'
        }
    ],

    init: function () {
        this.listen({
            component: {
                'button#toggle-button': {
                    click: this.onToggleAvailability
                }
            },
            controller: {
                '#ServiceProblems': {
                    'serviceProblemPulled': this.refreshAgentState
                },
                '#Security': {
                    'authenticated': this.refreshAgentState
                }
            }
        });
    },

    refreshAgentState: function () {
        this.getAgentStateStore().load();
    },

    onToggleAvailability: function () {
        var me = this;

        Ext.Ajax.request({
            method: 'POST',
            url: 'api/agent/toggleAvailability',
            success: function (response) {
                me.getAgentStateStore().loadRawData(response);
            }
        });
    }
});
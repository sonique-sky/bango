Ext.define('Spm.controller.MyStatus', {
    extend: 'Ext.app.Controller',
    alias: 'controller.myStatus',

    requires: [
        'Spm.proxy.AgentStateApiProxy'
    ],

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
                    'serviceProblemPulled': this.refreshAgentState,
                    'workItemHeld': this.refreshAgentState,
                    'workItemReleased': this.refreshAgentState
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

        var operation = Spm.proxy.ApiOperation.agentToggleAvailability();

        Spm.proxy.AgentStateApiProxy.update(operation, function (operation) {
            if (operation.wasSuccessful()) {
                me.getAgentStateStore().loadRecords(operation.getResultSet().records);
            }
        }, this);
    }
});
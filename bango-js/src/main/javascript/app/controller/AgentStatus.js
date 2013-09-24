Ext.define('Spm.controller.AgentStatus', {
    extend: 'Ext.app.Controller',
    alias: 'controller.agentStatus',

    requires: [
        'Spm.proxy.AgentStateApiProxy'
    ],

    models: [
        'Agent'
    ],

    mixins: [
        'Spm.controller.mixins.ActionContextManager'
    ],

    stores: [
        'AuthenticatedAgent',
        'AgentQueues',
        'AgentState'
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
            controller: {
                '#ServiceProblems': {
                    'serviceProblemPulled': this.refreshAgentState,
                    'workItemHeld': this.refreshAgentState,
                    'workItemReleased': this.refreshAgentState
                },
                '#Security': {
                    'authenticated': this.onAuthenticated
                }
            },
            store: {
                '#AgentState': {
                    'refresh': this.onAgentStateLoaded
                }
            }
        });
    },

    onAuthenticated: function () {
        this.refreshAgentState();
        this.updateActionStates(this.getAgentStatusPanel());
    },

    refreshAgentState: function () {
        this.getAgentStateStore().load();
    },

    onAgentStateLoaded: function (agentStateStore) {
        this.getAgentStatusPanel().updateState(agentStateStore.first().get('isAvailable'));
    }
});
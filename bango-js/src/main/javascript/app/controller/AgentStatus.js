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

    listen: {
        global: {
            authenticated: 'onAuthenticated'
        },
        controller: {
            '#ServiceProblems': {
                'serviceProblemPulled': 'refreshAgentState',
                'workItemHeld': 'refreshAgentState',
                'workItemReleased': 'refreshAgentState'
            }
        },
        store: {
            '#AgentState': {
                'refresh': 'onAgentStateLoaded'
            }
        }
    },

    onAuthenticated: function () {
        this.refreshAgentState();
        this.updateActionStates(this.getAgentStatusPanel());
    },

    refreshAgentState: function () {
        this.getAgentStateStore().load();
    },

    onAgentStateLoaded: function (agentStateStore) {
        var available = agentStateStore.first().get('isAvailable');
        this.getAgentStatusPanel().updateState(available);
    }
});
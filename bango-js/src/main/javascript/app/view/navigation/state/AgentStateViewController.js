Ext.define('Spm.view.navigation.state.AgentStateViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.agentState',

    listen: {
        global: {
            authenticated: 'onAuthenticated'
        },
        controller: {
            'superman' : {
                authenticated: 'onAuthenticated'
            },
            'serviceProblemTab' : {
                serviceProblemPulled: 'refreshAgentState'
            }
        }

        //controller: {
        //    '#ServiceProblems': {
        //        'serviceProblemPulled': 'refreshAgentState',
        //        'workItemHeld': 'refreshAgentState',
        //        'workItemReleased': 'refreshAgentState'
        //    }
        //},
    },

    onAuthenticated: function () {
        this.refreshAgentState();
    },

    refreshAgentState: function () {
        this.getViewModel().getStore('agentState').load();
    },

    onAgentStateLoaded: function (agentStateStore) {
        var agentStateModel = agentStateStore.first();
        this.getViewModel().set('currentAgentState', agentStateModel);
        this.updateState(agentStateModel.get('isAvailable'));
    },

    updateState: function (isAvailable) {
        var statusLabel = this.lookupReference('statusLabel');
        if (isAvailable) {
            statusLabel.removeCls('availability-indicator-off');
            statusLabel.addCls('availability-indicator-on');
        } else {
            statusLabel.removeCls('availability-indicator-on');
            statusLabel.addCls('availability-indicator-off');
        }
    }
});
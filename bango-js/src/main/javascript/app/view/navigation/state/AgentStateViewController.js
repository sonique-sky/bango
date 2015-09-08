Ext.define('Spm.view.navigation.state.AgentStateViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.agentState',

    listen: {
        global: {
            authenticated: 'onAuthenticated'
        },
        controller: {
            'superman': {
                authenticated: 'onAuthenticated'
            },
            'serviceProblemTab': {
                serviceProblemPulled: 'refreshAgentState',
                serviceProblemHoldToggled: 'refreshAgentState'
            },
            'myItems': {
                serviceProblemHoldToggled: 'refreshAgentState'
            },
            'workReminderDialog': {
                workReminderCreated: 'refreshAgentState'
            },
            'troubleReportDialog': {
                troubleReportCreated: 'refreshAgentState'
            }
        }
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
        this.updateState(agentStateModel.isAvailable());
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
    },

    toggleAvailability: function () {
        var me = this;
        Ext.Ajax.request({
            url: 'api/agent/toggleAvailability',
            method: 'POST',
            success: function (agentState) {
                me.getStore('agentState').loadRawData(agentState);
            },
            scope: this
        });
    }
});
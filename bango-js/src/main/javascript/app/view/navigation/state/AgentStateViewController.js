Ext.define('Spm.view.navigation.state.AgentStateViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.agentState',

    listen: {
        global: {
            authenticated: 'refreshAgentState'
        },
        controller: {
            'superman': {
                authenticated: 'refreshAgentState'
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
            'transferServiceProblemDialog': {
                serviceProblemTransferred: 'refreshAgentState'
            },
            'clearServiceProblemDialog': {
                serviceProblemCleared: 'refreshAgentState'
            },
            'troubleReportDialog': {
                troubleReportCreated: 'refreshAgentState'
            }
        }
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
        statusLabel.removeCls(Ext.String.format('availability-indicator-{0}', isAvailable ? 'off' : 'on'));
        statusLabel.addCls(Ext.String.format('availability-indicator-{0}', isAvailable ? 'on' : 'off'));
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
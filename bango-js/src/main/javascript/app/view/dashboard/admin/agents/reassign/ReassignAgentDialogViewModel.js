Ext.define('Spm.view.dashboard.admin.agents.reassign.ReassignAgentDialogViewModel', {
    extend: 'Spm.component.StandardDialogViewModel',
    alias: 'viewmodel.reassignAgentDialog',

    data: {
        agent: null,
        acceptButtonDefaultDisabled: false
    },

    stores: {
        teams: {
            type: 'teams',
            remoteFilter: false,
            pageSize: 0,
            listeners: {
                load: 'onTeamStoreLoaded'
            }
        }
    },

    agent: function () {
        return this.get('agent');
    },

    currentTeam: function () {
        return this.agent().getTeam();
    }

});

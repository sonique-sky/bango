Ext.define('Spm.view.dashboard.admin.agents.reassign.ReassignAgentDialogViewModel', {
    extend: 'Spm.component.StandardDialogViewModel',
    alias: 'viewmodel.reassignAgentDialog',

    data: {
        agent: null,
        newTeam: null,
        acceptButtonDefaultDisabled: false
    },

    stores: {
        teams: {
            type: 'teams',
            remoteSort: true,
            pageSize: 0
        }
    },

    agent: function () {
        return this.get('agent');
    },

    currentTeam: function () {
        return this.agent().team;
    },

    newTeam: function () {
        return this.get('newTeam')
    }
});

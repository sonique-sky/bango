Ext.define('Spm.view.dashboard.admin.agents.create.CreateAgentDialogViewModel', {
    extend: 'Spm.component.StandardDialogViewModel',
    alias: 'viewmodel.createAgentDialog',

    requires: [
        'Spm.model.Agent'
    ],

    data: {
        agent: Ext.create('Spm.model.Agent'),
        acceptButtonDefaultDisabled: false
    },

    stores: {
        teams: {type: 'teams', pageSize: 0},
        roles: {type: 'roles', pageSize: 0}
    },

    formulas: {
        teamRequired: {
            bind: '{agent.role}',
            get: function (role) {
                return !role || Ext.Array.contains(['ROLE_USER', 'ROLE_TEAM_LEAD'], role);
            }
        }
    }
});

Ext.define('Spm.view.dashboard.admin.agents.CreateAgentDialogViewModel', {
    extend: 'Spm.component.StandardDialogViewModel',
    alias: 'viewmodel.createAgent',

    requires: [
        'Spm.model.Agent'
    ],

    data: {
        agent: Ext.create('Spm.model.Agent')
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
        },
        acceptButtonDefaultDisabled: {
            bind: {
                bindTo: '{agent}',
                deep: true
            },
            get: function (agent) {
                return !agent.get('agent')
                    || !agent.get('agent.details.firstName')
                    || !agent.get('agent.details.lastName')
                    || !agent.get('agent.role');
            }
        }
    }
});

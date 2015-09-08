Ext.define('Spm.view.dashboard.admin.agents.CreateAgentDialogViewModel', {
    extend: 'Spm.component.StandardDialogViewModel',
    alias: 'viewmodel.createAgent',

    data: {
        agent: Ext.create('Spm.model.Agent')
    },

    stores: {
        teams: {type: 'teams', pageSize: 0},
        roles: {
            fields: ['name', 'description'],
            data: [
                {name: 'ROLE_USER', description: 'Team Member'},
                {name: 'ROLE_TEAM_LEAD', description: 'Team Leader'},
                {name: 'ROLE_QUEUE_CONTROLLER', description: 'Queue Controller'},
                {name: 'ROLE_MSP_ADMINISTRATOR', description: 'Msp Administrator'}
            ]
        }
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

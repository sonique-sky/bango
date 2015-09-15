Ext.define('Spm.view.dashboard.admin.agents.role.ChangeAgentRoleDialogViewModel', {
    extend: 'Spm.component.StandardDialogViewModel',
    alias: 'viewmodel.changeAgentRoleDialog',

    data: {
        acceptButtonDefaultDisabled: false,
        agent: null
    },

    stores: {
        teams: {type: 'teams', pageSize: 0, autoLoad: true},
        roles: {type: 'roles', pageSize: 0}
    },

    formulas: {
        mayBelongToATeam: {
            bind: {
                bindTo: '{agent.role.name}'
            },
            get: function (roleName) {
                return roleName === 'ROLE_QUEUE_CONTROLLER';
            }
        },
        agentRole: {
            bind: {
                bindTo: '{agent.role.name}'
            },
            get: function (roleName) {
                return roleName;
            },
            set: function (roleName) {
                this.set('agent.role.name', roleName);
                if (roleName === 'ROLE_QUEUE_CONTROLLER') {
                    this.set('agent.team', null);
                }
            }
        }
    }

})
;

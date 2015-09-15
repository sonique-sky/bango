Ext.define('Spm.view.dashboard.admin.agents.role.ChangeAgentRoleDialogViewModel', {
    extend: 'Spm.component.StandardDialogViewModel',
    alias: 'viewmodel.changeAgentRoleDialog',

    data: {
        acceptButtonDefaultDisabled: false
    },

    stores: {
        teams: {type: 'teams', pageSize: 0, autoLoad: true},
        roles: {type: 'roles', pageSize: 0}
    }

});

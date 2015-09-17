Ext.define('Spm.view.dashboard.admin.agents.create.CreateAgentDialogViewModel', {
    extend: 'Spm.component.StandardDialogViewModel',
    alias: 'viewmodel.createAgentDialog',

    requires: [
        'Spm.model.Agent'
    ],

    data: {
        agent: null
    },

    stores: {
        teams: {type: 'teams', pageSize: 0},
        roles: {type: 'roles', pageSize: 0}
    }

});

Ext.define('Spm.view.dashboard.admin.teams.create.CreateTeamDialogViewModel', {
    extend: 'Spm.component.StandardDialogViewModel',
    alias: 'viewmodel.createTeamDialog',

    data: {
        team: null
    },

    formulas: {
        acceptButtonDefaultDisabled: {
            bind: {
                bindTo: '{team.name}'
            },
            get: function (name) {
                return !name;
            }
        }
    }
});

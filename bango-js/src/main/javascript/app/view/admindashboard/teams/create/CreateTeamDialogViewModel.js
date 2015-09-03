Ext.define('Spm.view.admindashboard.teams.create.CreateTeamDialogViewModel', {
    extend: 'Spm.component.StandardDialogViewModel',
    alias: 'viewmodel.createTeamDialog',

    data: {
        team: Ext.create('Spm.model.Team')
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
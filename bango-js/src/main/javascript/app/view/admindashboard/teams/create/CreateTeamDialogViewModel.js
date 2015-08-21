Ext.define('Spm.view.admindashboard.teams.create.CreateTeamDialogViewModel', {
    extend: 'Spm.component.StandardDialogViewModel',
    alias: 'viewmodel.createTeamDialog',

    data: {
        team: {
            name: ''
        }
    },

    formulas: {
        acceptButtonDefaultDisabled: {
            get: function (get) {
                return get('team.name') === '';
            }
        }
    }
});
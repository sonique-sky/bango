Ext.define('Spm.view.admindashboard.teams.TeamsTabViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.adminTeamsTab',

    stores: {
        teams: {
            type: 'adminTeams',
            listeners: {
                load: 'onTeamStoreLoaded'
            }
        }
    }
});
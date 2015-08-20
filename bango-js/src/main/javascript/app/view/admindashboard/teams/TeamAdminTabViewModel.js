Ext.define('Spm.view.admindashboard.teams.TeamAdminTabViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.teamAdminTab',

    stores: {
        teams: {
            type: 'teams',
            listeners: {
                load: 'onTeamStoreLoaded'
            }
        }
    }
});
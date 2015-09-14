Ext.define('Spm.view.dashboard.admin.teams.TeamAdminTabViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.teamAdminTab',

    stores: {
        teams: {
            type: 'teams',
            remoteSort: true,
            listeners: {
                load: 'onTeamStoreLoaded'
            }
        }
    }
});

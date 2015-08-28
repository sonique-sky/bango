Ext.define('Spm.view.admindashboard.agents.AgentAdminTabViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.agentAdminTab',

    stores: {
        teams: {
            type: 'agents',
            listeners: {
                //load: 'onTeamStoreLoaded'
            }
        }
    }
});
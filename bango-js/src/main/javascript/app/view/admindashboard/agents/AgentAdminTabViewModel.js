Ext.define('Spm.view.admindashboard.agents.AgentAdminTabViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.agentAdminTab',

    stores: {
        agents: {
            type: 'agents',
            listeners: {
                load: 'onAgentStoreLoaded'
            }
        }
    }
});
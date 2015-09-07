Ext.define('Spm.view.dashboard.admin.agents.AgentAdminTabViewModel', {
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

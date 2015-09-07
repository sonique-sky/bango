Ext.define('Spm.view.dashboard.agent.AgentDashboardViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.agentDashboard',

    stores: {
        agents: {
            type: 'agents'
        }
    }
});

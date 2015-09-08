Ext.define('Spm.view.dashboard.agent.AgentDashboardViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.agentDashboard',

    stores: {
        agents: {
            fields: ['agentCode', 'teamName', 'agentAvailability', 'availabilityChangeDate', 'assignedWorkItemCount'],

            proxy: {
                type: 'ajax',
                url: 'api/dashboard/agent',
                reader: {
                    type: 'json',
                    rootProperty: 'onePageOfSearchResults'
                }
            }
        }
    }
});

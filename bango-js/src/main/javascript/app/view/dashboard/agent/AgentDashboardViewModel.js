Ext.define('Spm.view.dashboard.agent.AgentDashboardViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.agentDashboard',

    stores: {
        agents: {
            fields: ['agentCode', 'agentAvailability', 'availabilityChangeDate', 'assignedWorkItemCount',
                {
                    name: 'teamName',
                    convert: function (val) {
                        return Ext.Object.isEmpty(val) ? 'No Team': val;
                    }
                }],
            groupField: 'teamName',
            pageSize: 0,
            proxy: {
                type: 'ajax',
                url: 'api/dashboard/agent',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        }
    }
});

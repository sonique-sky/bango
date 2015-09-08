Ext.define('Spm.view.dashboard.agent.AgentDashboardTab', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.agentDashboard',

    viewModel: 'agentDashboard',
    controller: 'agentDashboard',

    require: [
        'Spm.view.component.AutoRefreshToolbar'
    ],

    listeners: {
        activate: 'loadStore'
    },

    bind: {
        store: '{agents}'
    },

    title: 'Agent Dashboard',
    iconCls: 'icon-agent-dashboard',
    closable: false,

    dockedItems: [
        {
            xtype: 'autorefreshtoolbar',
            border: 0,
            bind: {
                store: '{agents}'
            }
        }
    ],

    columns: [
        {text: 'Username', dataIndex: 'agentCode'},
        {text: 'Status', dataIndex: 'agentAvailability', align: 'center', renderer: 'agentStatusRenderer'},
        {text: '# Assigned Items', dataIndex: 'assignedWorkItemCount'},
        {text: 'Duration (Minutes)', dataIndex: 'availabilityChangeDate', renderer: 'availabilityDurationRenderer'}
    ]
});

Ext.define('Spm.view.dashboard.admin.AdminDashboardTab', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.adminDashboardTab',

    require: [
        'Spm.view.dashboard.admin.teams.TeamAdminTab',
        'Spm.view.dashboard.admin.queues.QueueAdminTab',
        'Spm.view.dashboard.admin.agent.AgentAdminTab'
    ],

    title: 'Admin Dashboard',
    iconCls: 'icon-admin-dashboard',
    closable: false,

    items: [
        {xtype: 'teamAdminTab'},
        {xtype: 'agentAdminTab'},
        {xtype: 'problemCategoryAdminTab'},
        {xtype: 'queueAdminTab'}
    ]
});

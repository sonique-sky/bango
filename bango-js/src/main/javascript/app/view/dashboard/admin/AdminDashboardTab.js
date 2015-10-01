Ext.define('Spm.view.dashboard.admin.AdminDashboardTab', {
    extend: 'Spm.view.component.route.RoutingTabPanel',
    alias: 'widget.adminDashboardTab',
    reference: 'adminDashboard',
    itemId: 'adminDashboard',

    requires: [
        'Spm.view.dashboard.admin.agents.AgentAdminTab',
        'Spm.view.dashboard.admin.problemcategories.ProblemCategoryAdminTab',
        'Spm.view.dashboard.admin.queues.QueueAdminTab',
        'Spm.view.dashboard.admin.teams.TeamAdminTab'
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

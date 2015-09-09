Ext.define('Spm.view.container.AppContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.appContainer',

    requires: [
        'Ext.tab.Panel',
        'Ext.layout.container.Border',
        'Spm.view.component.AutoRefreshToolbar',

        'Spm.view.navigation.NavigationPanel',
        'Spm.view.header.AppHeader',
        'Spm.view.header.AppHeaderViewController',
        'Spm.view.myitems.MyItemsTabViewModel',
        'Spm.view.myitems.MyItemsTabViewController',
        'Spm.view.dashboard.admin.AdminDashboardTab',
        'Spm.view.dashboard.admin.agents.AgentAdminTab',
        'Spm.view.dashboard.admin.agents.AgentAdminTabViewController',
        'Spm.view.dashboard.admin.agents.AgentAdminTabViewModel',
        'Spm.view.dashboard.admin.problemcategories.ProblemCategoryAdminTab',
        'Spm.view.dashboard.admin.problemcategories.ProblemCategoryAdminTabViewController',
        'Spm.view.dashboard.admin.problemcategories.ProblemCategoryAdminTabViewModel',
        'Spm.view.dashboard.admin.queues.QueueAdminTab',
        'Spm.view.dashboard.admin.queues.QueueAdminTabViewController',
        'Spm.view.dashboard.admin.queues.QueueAdminTabViewModel',
        'Spm.view.dashboard.admin.teams.TeamAdminTab',
        'Spm.view.dashboard.admin.teams.TeamAdminTabViewController',
        'Spm.view.dashboard.admin.teams.TeamAdminTabViewModel',
        'Spm.view.dashboard.agent.AgentDashboardTab',
        'Spm.view.dashboard.agent.AgentDashboardViewModel',
        'Spm.view.dashboard.agent.AgentDashboardViewController',
        'Spm.view.dashboard.queue.QueueDashboardTab',
        'Spm.view.dashboard.queue.QueueDashboardTabViewController',
        'Spm.view.dashboard.queue.QueueDashboardTabViewModel',
        'Spm.view.dashboard.msp.MspDashboardTab',

        'Spm.store.Teams',
        'Spm.store.Agents',
        'Spm.store.ProblemCategories',

        'Spm.proxy.TroubleReportProxy',
        'Spm.proxy.TroubleReportTemplateProxy'
    ],

    controller: 'appContainer',
    viewModel: {type: 'appContainer'},
    reference: 'appContainer',
    hidden: true,
    cls: 'superman-app-container',
    itemId: 'appContainer',
    id: 'superman-app-container',
    layout: {
        type: 'border'
    },

    items: [
        {
            xtype: 'tabpanel',
            reference: 'tabPanel',
            region: 'center',
            id: 'tab-panel',
            padding: '0 5 0 5'
        },
        {
            xtype: 'navigationPanel',
            region: 'west',
            padding: '0 0 0 5'
        },
        {
            xtype: 'appHeader',
            region: 'north',
            border: 0
        }
    ]
});

Ext.define('Spm.view.container.AppContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.appContainer',

    requires: [
        'Ext.tab.Panel',
        'Ext.layout.container.Border',
        'Spm.view.navigation.NavigationPanel',
        'Spm.view.header.AppHeader',
        'Spm.view.header.AppHeaderViewController',
        'Spm.view.myitems.MyItemsTabViewModel',
        'Spm.view.myitems.MyItemsTabViewController',
        'Spm.view.admindashboard.AdminDashboardTab',
        'Spm.view.admindashboard.agents.AgentAdminTab',
        'Spm.view.admindashboard.agents.AgentAdminTabViewController',
        'Spm.view.admindashboard.teams.TeamAdminTab',
        'Spm.view.admindashboard.teams.TeamAdminTabViewController',
        'Spm.view.admindashboard.teams.TeamAdminTabViewModel',
        'Spm.view.dashboard.queue.QueueDashboardTab',
        'Spm.store.MyItems',
        'Spm.store.Teams',

        'Spm.proxy.TroubleReportProxy'
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

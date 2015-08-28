Ext.define('Spm.view.admindashboard.AdminDashboardTab', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.adminDashboardTab',

    require: [
        'Spm.view.admindashboard.teams.TeamAdminTab',
        'Spm.view.admindashboard.agent.AgentAdminTab'
    ],

    title: 'Admin Dashboard',
    iconCls: 'icon-admin-dashboard',
    closable: false,

    items: [{
        xtype: 'tabpanel',
        items: [
            {xtype: 'teamAdminTab'},
            {xtype: 'agentAdminTab'},
            {
                xtype: 'panel',
                iconCls: 'icon-admin-dashboard',
                title: 'Problem Categories'
            },
            {
                xtype: 'panel',
                iconCls: 'icon-admin-dashboard',
                title: 'Queues'
            }
        ]
    }]
});
Ext.define('Spm.view.admindashboard.AdminDashboardTab', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.adminDashboardTab',

    require: [
        'Spm.view.admindashboard.teams.TeamAdminTab'
    ],

    title: 'Admin Dashboard',
    iconCls: 'icon-admin-dashboard',
    closable: false,

    items: [{
        xtype: 'tabpanel',
        items: [
            {
                xtype: 'teamAdminTab'
            },
            {
                xtype: 'panel',
                iconCls: 'icon-admin-dashboard',
                title: 'Agents'
            },
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

    }
    ]
});
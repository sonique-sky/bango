Ext.define('Spm.view.dashboard.msp.MspDashboardTab', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.mspDashboard',

    require: [
        'Spm.view.component.AutoRefreshToolbar'
    ],

    title: 'MSP Dashboard',
    iconCls: 'icon-msp-dashboard',
    closable: false,

    dockedItems: [
        {
            xtype: 'autorefreshtoolbar',
            border: 0
        }
    ]

});

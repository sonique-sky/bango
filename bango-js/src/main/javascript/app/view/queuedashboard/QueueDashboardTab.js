Ext.define('Spm.view.queuedashboard.QueueDashboardTab', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.queueDashboard',


    title: 'Queue Dashboard',
    iconCls: 'icon-queue-dashboard',
    closable: false,

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'button',
                    text: 'Refresh',
                    iconCls: 'icon-refresh',
                    menu: {
                        xtype: 'menu',
                        items: [
                            {text: 'Disabled', group: 'refresh', checked: true, handler: 'refreshPeriodChanged'},
                            {text: '1 Minute', group: 'refresh', checked: false, handler: 'refreshPeriodChanged'},
                            {text: '5 Minutes', group: 'refresh', checked: false, handler: 'refreshPeriodChanged'},
                            {text: '10 Minutes', group: 'refresh', checked: false, handler: 'refreshPeriodChanged'},
                            {text: '15 Minutes', group: 'refresh', checked: false, handler: 'refreshPeriodChanged'},
                            {text: '30 Minutes', group: 'refresh', checked: false, handler: 'refreshPeriodChanged'}
                        ]
                    }
                },
                "-",
                {
                    xtype: 'tbtext',
                    text: 'Auto Refresh :'
                }
            ]
        }
    ],

    columns: [
        {
            text: 'Queue'
        },
        {
            text: 'Service Problem',
            columns: [
                {text: '# of SPs'},
                {text: 'Date'}
            ]
        },
        {
            text: 'Service Level Agreement',
            columns: [
                {text: '< 12h'},
                {text: '12-0h'},
                {text: '0-24h'},
                {text: '1-4d'},
                {text: '> 4d'}
            ]
        },
        {
            text: 'Work Item Status',
            columns: [
                {
                    text: 'Assigned',
                    columns: [
                        {text: 'Assigned Push'},
                        {text: 'Assigned Pull'}
                    ]
                },
                {
                    text: 'Unassigned',
                    columns: [
                        {text: 'Unassigned Push'},
                        {text: 'Unassigned Pull'}
                    ]
                },
                {
                    columns: [
                        {text: 'No WI'}
                    ]
                }
            ]
        }
    ]
});
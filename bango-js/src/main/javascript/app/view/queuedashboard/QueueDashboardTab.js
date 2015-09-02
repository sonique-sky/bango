Ext.define('Spm.view.queuedashboard.QueueDashboardTab', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.queueDashboard',

    controller: 'queueDashboard',

    title: 'Queue Dashboard',
    iconCls: 'icon-queue-dashboard',
    closable: false,
    flex: 1,

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
                            {text: 'Disabled', value: -1, group: 'refresh', checked: true, handler: 'refreshPeriodChanged'},
                            {text: '1 Minute', value: 1, group: 'refresh', checked: false, handler: 'refreshPeriodChanged'},
                            {text: '5 Minutes', value: 5, group: 'refresh', checked: false, handler: 'refreshPeriodChanged'},
                            {text: '10 Minutes', value: 10, group: 'refresh', checked: false, handler: 'refreshPeriodChanged'},
                            {text: '15 Minutes', value: 15, group: 'refresh', checked: false, handler: 'refreshPeriodChanged'},
                            {text: '30 Minutes', value: 30, group: 'refresh', checked: false, handler: 'refreshPeriodChanged'}
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
                {text: '< 12h', width: 55},
                {text: '12-0h', width: 55},
                {text: '0-24h', width: 55},
                {text: '1-4d', width: 55},
                {text: '> 4d', width: 55}
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
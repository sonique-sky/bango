Ext.define('Spm.view.queuedashboard.QueueDashboardTab', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.queueDashboard',

    require: [
        'Spm.view.component.AutoRefreshToolbar'
    ],

    controller: 'queueDashboard',
    viewModel: {type: 'queueDashboard'},

    title: 'Queue Dashboard',
    iconCls: 'icon-queue-dashboard',
    closable: false,

    dockedItems: [
        {
            xtype: 'autorefreshtoolbar',
            border: 0
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

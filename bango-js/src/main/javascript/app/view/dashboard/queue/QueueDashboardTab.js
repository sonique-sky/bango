Ext.define('Spm.view.dashboard.queue.QueueDashboardTab', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.queueDashboard',

    require: [
        'Spm.view.component.AutoRefreshToolbar'
    ],

    controller: 'queueDashboard',
    viewModel: {type: 'queueDashboard'},

    listeners: {
        activate: 'loadStore',
        cellclick: 'onCellClicked'
    },

    bind: {
        store: '{queueDashboardEntries}'
    },

    title: 'Queue Dashboard',
    iconCls: 'icon-queue-dashboard',
    closable: false,

    dockedItems: [
        {
            xtype: 'autorefreshtoolbar',
            border: 0,
            bind: {
                store: '{queueDashboardEntries}'
            }
        }
    ],

    columns: [
        {
            text: 'Queue',
            dataIndex: 'queueName',
            width: 200,
            hideable: false
        },
        {
            text: 'Service Problem',
            menuDisabled: true,
            columns: [
                {text: '# of SPs', width: 55, dataIndex: 'serviceProblemCount'},
                {text: 'Date', xtype: 'datecolumn', format: 'd/m/y H:i', dataIndex: 'oldestServiceProblemDate'}
            ]
        },
        {
            text: 'Service Level Agreement',
            menuDisabled: true,
            columns: [
                {text: '< 12h', width: 55, dataIndex: 'slaExpiresInLessThan12Hours'},
                {text: '12-0h', width: 55, dataIndex: 'slaExpiresInMoreThan12Hours'},
                {text: '0-24h', width: 55, dataIndex: 'slaExpiredLessThanADayAgo'},
                {text: ' 1-4d', width: 55, dataIndex: 'slaExpiredBetween1And4DaysAgo'},
                {text: ' > 4d', width: 55, dataIndex: 'slaExpiredMoreThan4DaysAgo'}
            ]
        },
        {
            text: 'Work Item Status',
            menuDisabled: true,
            columns: [
                {
                    text: 'Assigned',
                    menuDisabled: true,
                    columns: [
                        {text: 'Assigned Push', dataIndex: 'assignedPush'},
                        {text: 'Assigned Pull', dataIndex: 'assignedPull'}
                    ]
                },
                {
                    text: 'Unassigned',
                    menuDisabled: true,
                    columns: [
                        {text: 'Unassigned Push', dataIndex: 'unassignedPush'},
                        {text: 'Unassigned Pull', dataIndex: 'unassignedPull'}
                    ]
                },
                {text: 'No WI', width: 55, dataIndex: 'noWorkItem'}
            ]
        }
    ]
});

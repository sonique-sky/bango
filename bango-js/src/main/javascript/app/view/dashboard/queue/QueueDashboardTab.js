Ext.define('Spm.view.dashboard.queue.QueueDashboardTab', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.queueDashboard',

    requires: [
        'Ext.grid.feature.Summary',
        'Spm.view.component.AutoRefreshToolbar',
        'Spm.view.dashboard.queue.QueueDashboardTabViewController',
        'Spm.view.dashboard.queue.QueueDashboardTabViewModel'
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

    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }],

    columns: [
        {
            text: 'Queue',
            dataIndex: 'queueName',
            width: 200,
            hideable: false,
            summaryRenderer: function() {
                return 'Total';
            }
        },
        {
            text: 'Service Problem',
            menuDisabled: true,
            columns: [
                {text: '# of SPs', width: 55, dataIndex: 'serviceProblemCount', summaryType: 'sum'},
                {text: 'Date', xtype: 'datecolumn', format: 'd/m/y H:i', dataIndex: 'oldestServiceProblemDate'}
            ]
        },
        {
            text: 'Service Level Agreement',
            menuDisabled: true,
            columns: [
                {text: '< 12h', width: 55, dataIndex: 'slaExpiresInLessThan12Hours', summaryType: 'sum'},
                {text: '12-0h', width: 55, dataIndex: 'slaExpiresInMoreThan12Hours', summaryType: 'sum'},
                {text: '0-24h', width: 55, dataIndex: 'slaExpiredLessThanADayAgo', summaryType: 'sum'},
                {text: ' 1-4d', width: 55, dataIndex: 'slaExpiredBetween1And4DaysAgo', summaryType: 'sum'},
                {text: ' > 4d', width: 55, dataIndex: 'slaExpiredMoreThan4DaysAgo', summaryType: 'sum'}
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
                        {text: 'Assigned Push', dataIndex: 'assignedPush', summaryType: 'sum'},
                        {text: 'Assigned Pull', dataIndex: 'assignedPull', summaryType: 'sum'}
                    ]
                },
                {
                    text: 'Unassigned',
                    menuDisabled: true,
                    columns: [
                        {text: 'Unassigned Push', dataIndex: 'unassignedPush', summaryType: 'sum'},
                        {text: 'Unassigned Pull', dataIndex: 'unassignedPull', summaryType: 'sum'}
                    ]
                },
                {text: 'No WI', width: 55, dataIndex: 'noWorkItem', summaryType: 'sum'}
            ]
        }
    ]
});

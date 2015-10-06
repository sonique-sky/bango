Ext.define('Spm.view.filtered.FilteredServiceProblems', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.filteredServiceProblems',

    requires: [
        'Ext.button.Button',
        'Ext.grid.column.Template',
        'Ext.toolbar.Paging',
        'Ext.toolbar.Spacer',
        'Spm.view.filtered.FilteredServiceProblemsViewController',
        'Spm.view.filtered.FilteredServiceProblemsViewModel'
    ],

    controller: 'filteredServiceProblems',
    viewModel: {type: 'filteredServiceProblems'},

    listeners: {
        cellclick: 'onCellClicked',
        selectionchange: 'onSelectionChanged'
    },

    border: 0,
    closable: true,
    cls: 'queue-tab',

    dockedItems: [{
        xtype: 'toolbar',
        items: [
            {
                xtype: 'button',
                text: 'Transfer',
                handler: 'onBulkTransfer',
                bind: {
                    disabled: '{bulkTransferDisabled}'
                }
            },
            {
                xtype: 'button',
                text: 'Clear',
                handler: 'onBulkClear',
                bind: {
                    disabled: '{bulkClearDisabled}'
                }
            },
            " ",
            {
                xtype: 'pagingtoolbar',
                border: 0,
                bind: {
                    store: '{filteredServiceProblems}'
                }
            }
        ]
    }],

    selModel: {
        selType: 'checkboxmodel',
        checkOnly: true
    },
    columns: [
        {
            text: 'Service Problem',
            columns: [
                {text: 'Service Problem Id', dataIndex: 'serviceProblemId', width: 100},
                {text: 'Opened Date', dataIndex: 'openedDate', width: 140, xtype: 'datecolumn', format: 'd/m/y H:i'},
                {text: 'Status', dataIndex: 'status', width: 65},
                {text: 'Problem Description', dataIndex: 'problem', width: 250}
            ]
        },
        {
            text: 'Work Item',
            columns: [
                {
                    xtype: 'templatecolumn',
                    tpl: '{[values.workItem ? (values.workItem.agent ? values.workItem.agent.displayName: "") : ""]}',
                    text: 'Agent',
                    width: 100
                },
                {
                    xtype: 'templatecolumn',
                    tpl: '{[values.workItem ? values.workItem.action.description : ""]}',
                    text: 'Action',
                    width: 100
                },
                {
                    text: 'Created',
                    width: 140,
                    renderer: 'workItemCreatedDateRenderer'
                },
                {
                    xtype: 'templatecolumn',
                    tpl: '{[values.workItem ? values.workItem.assignmentType : ""]}',
                    text: 'Type',
                    width: 65
                },
                {
                    xtype: 'templatecolumn',
                    tpl: '{[values.workItem ? values.workItem.status : ""]}',
                    text: 'Work Item Status',
                    width: 80
                },
                {
                    text: 'Reminder',
                    width: 100,
                    renderer: 'workItemReminderRenderer'
                }
            ]
        }
    ]
});

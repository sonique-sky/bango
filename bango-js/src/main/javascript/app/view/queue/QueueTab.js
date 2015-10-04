Ext.define('Spm.view.queue.QueueTab', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.queueTab',

    requires: [
        'Ext.button.Button',
        'Ext.grid.column.Template',
        'Ext.toolbar.Paging',
        'Ext.toolbar.Spacer',
        'Spm.view.queue.QueueTabViewController',
        'Spm.view.queue.QueueTabViewModel'
    ],

    controller: 'queueTab',
    viewModel: {type: 'queueTab'},

    listeners: {
        activate: 'onQueueTabActivated',
        deactivate: 'onQueueTabDeactivated',
        close: 'onQueueTabClosed',
        added: 'loadQueuedServiceProblems',
        cellclick: 'onCellClicked',
        selectionchange: 'onSelectionChanged'
    },

    border: 0,
    closable: true,
    iconCls: 'icon-queue',

    bind: {
        title: '{queue.name}',
        store: '{queuedServiceProblems}'
    },

    dockedItems: [{
        xtype: 'toolbar',
        items: [
            {
                xtype: 'button',
                text: 'Select All',
                handler: 'onSelectAll'
            },
            {
                xtype: 'button',
                text: 'Deselect All',
                handler: 'onDeselectAll'
            },
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
                    store: '{queuedServiceProblems}'
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
                {text: 'Service Problem Id', dataIndex: 'serviceProblemId'},
                {text: 'Status', dataIndex: 'status'}
            ]
        },
        {
            text: 'Work Item',
            columns: [
                {xtype: 'templatecolumn', tpl: '{[values.workItem ? values.workItem.status : ""]}', text: 'Work Item Status'},
                {xtype: 'templatecolumn', tpl: '{[values.workItem ? (values.workItem.agent ? values.workItem.agent.displayName: "") : ""]}', text: 'Agent'}
            ]
        }
    ]
});

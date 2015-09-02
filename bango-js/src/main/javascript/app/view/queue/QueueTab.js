Ext.define('Spm.view.queue.QueueTab', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.queueTab',

    requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Spacer',
        'Ext.toolbar.Paging'
    ],

    controller: 'queueTab',
    viewModel: {type: 'queueTab'},

    listeners: {
        activate: 'onQueueTabActivated',
        deactivate: 'onQueueTabDeactivated',
        close: 'onQueueTabClosed',
        added: 'onQueueTabAdded',
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
            {xtype: 'tbspacer'},
            {
                xtype: 'pagingtoolbar',
                flex: 1.0,
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
                {xtype: 'templatecolumn', tpl: '{workItem.status}', text: 'Work Item Status'},
                {xtype: 'templatecolumn', tpl: '{workItem.agent.displayName}', text: 'Agent'}
            ]
        }
    ]
});

Ext.define('Spm.view.queue.transfer.BulkTransferDialog', {
    extend: 'Spm.component.StandardDialog',
    alias: 'widget.bulkTransferDialog',

    requires: [
        'Ext.grid.Panel',
        'Spm.view.queue.transfer.BulkTransferDialogViewController',
        'Spm.view.queue.transfer.BulkTransferDialogViewModel'
    ],

    controller: 'bulkTransferDialog',
    viewModel: {type: 'bulkTransferDialog'},

    listeners: {
        show: 'onShow'
    },

    height: 250,
    width: 450,
    iconCls: 'icon-bulk-transfer',
    title: 'Bulk Transfer',

    items: [
        {
            xtype: 'grid',
            bind: {
                store: '{queues}'
            },
            hideHeaders: true,
            margin: 5,
            border: 1,
            listeners: {
                select: 'onTransferQueueSelected'
            },
            columns: [
                {dataIndex: 'name', flex: 1}
            ]
        }
    ]
});

Ext.define('Spm.view.queue.BulkTransferDialog', {
    extend: 'Spm.view.component.StandardDialog',
    alias: 'widget.bulkTransferDialog',

    height: 250,
    width: 450,
    iconCls: 'icon-bulk-transfer',
    title: 'Bulk Transfer',

    controller: 'bulkTransferDialog',
    viewModel: {
        type: 'bulkTransferDialog'
    },

    reference: 'bulkTransferDialog',

    items: [
        {
            id: 'bulkTransferView',
            xtype: 'dataview',
            cls: 'bulk-transfer-view',
            tpl: [
                '<div id="transfer-queues-group">',
                '   <tpl for=".">',
                '      <div id="transfer-{name}" class="queue x-view-item">{name}</div>',
                '   </tpl>',
                '</div>'
            ],
            itemSelector: 'div.queue',
            overItemCls: 'x-item-over',
            bind: {
                store: '{allQueues}'
            },
            trackOver: true,
            autoScroll: true,
            margin: 5,
            border: 1,
            style: {
                borderColor: '#bcb1b0',
                borderStyle: 'solid'
            },
            listeners: {
                select: 'onTransferQueueSelected'
            }
        }
    ]
});
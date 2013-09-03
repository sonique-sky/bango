Ext.define('Spm.view.QueueTabToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.queueTabToolbar',

    requires: [
        'Ext.toolbar.Paging'
    ],

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'button',
                    id: 'bulk-transfer-' + me.queue.queueId(),
                    disabled: true,
                    text: 'Transfer',
                    iconCls: 'icon-transfer',
                    handler: me.onBulkTransfer,
                    scope: me
                },
                {
                    xtype: 'button',
                    id: 'bulk-clear-' + me.queue.queueId(),
                    text: 'Clear',
                    iconCls: 'icon-clear',
                    disabled: true,
                    handler: me.onBulkClear,
                    scope: me
                }
            ]
        });

        me.callParent(arguments);
    },

    onBulkTransfer: function () {
        this.fireEvent('startAction', 'bulkTransfer', this.up('queueTabContent'));
    },

    onBulkClear: function () {
        this.fireEvent('startAction', 'bulkClear', this.up('queueTabContent'));
    }
});
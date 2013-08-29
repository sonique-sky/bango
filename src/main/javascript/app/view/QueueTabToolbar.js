Ext.define('Spm.view.QueueTabToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.queueTabToolbar',

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'button',
                    text: 'Transfer',
                    iconCls: 'icon-transfer',
                    handler: me.onBulkTransfer,
                    scope: me
                },
                {
                    xtype: 'button',
                    text: 'Clear',
                    handler: me.onBulkClear,
                    scope: me
                }
            ]
        });

        me.callParent(arguments);
    },

    onBulkTransfer: function() {
        var queue = this.up('queueTabContent').getQueue();
        this.fireEvent('bulkTransfer', queue);
    },

    onBulkClear: function() {
        this.fireEvent('bulkClear');
    }
});
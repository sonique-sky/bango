Ext.define('Spm.view.queue.QueueTabToolbar', {
    extend: 'Spm.view.component.ActionToolbar',
    alias: 'widget.queueTabToolbar',

    initComponent: function () {
        Ext.applyIf(this, {
            items: [
                {
                    xtype: 'actionButton',
                    id: 'bulk-transfer-' + this.idSuffix,
                    disabled: true,
                    text: 'Transfer',
                    iconCls: 'icon-transfer',
                    handler: this.startAction,
                    scope: this,
                    actionName: 'bulkTransfer'
                },
                {
                    xtype: 'actionButton',
                    id: 'bulk-clear-' + this.idSuffix,
                    text: 'Clear',
                    iconCls: 'icon-clear',
                    disabled: true,
                    handler: this.startAction,
                    scope: this,
                    actionName: 'bulkClear'
                }
            ]
        });

        this.callParent(arguments);
    }
});
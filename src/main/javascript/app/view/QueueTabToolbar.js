Ext.define('Spm.view.QueueTabToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.queueTabToolbar',

    requires: [
        'Ext.toolbar.Paging',
        'Spm.view.component.ActionButton'
    ],

    config: {
        idSuffix: undefined,
        parentContainer: undefined
    },

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
    },

    startAction: function(actionButton) {
        this.fireEvent('startAction', actionButton.getActionName(), this.parentContainer);
    }
});
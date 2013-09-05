Ext.define('Spm.view.queue.ActionToolbar', {
    extend: 'Spm.view.component.ActionToolbar',
    alias: 'widget.queueTabToolbar',

    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {xtype: 'actionButton', id: 'bulk-transfer-' + me.idSuffix, actionName: 'bulk-transfer', scope: me, text: 'Transfer'},
                {xtype: 'actionButton', id: 'bulk-clear-' + me.idSuffix, actionName: 'bulk-clear', scope: me, text: 'Clear'}
            ]
        });

        this.callParent(arguments);
    }
});
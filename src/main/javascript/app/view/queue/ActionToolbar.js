Ext.define('Spm.view.queue.ActionToolbar', {
    extend: 'Spm.view.component.ActionToolbar',
    alias: 'widget.queueTabToolbar',

    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {xtype: 'actionButton', actionName: 'bulk-transfer', text: 'Transfer'},
                {xtype: 'actionButton', actionName: 'bulk-clear', text: 'Clear'}
            ]
        });

        this.callParent(arguments);
    }
});
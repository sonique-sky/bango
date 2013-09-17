Ext.define('Spm.view.queue.ActionToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.queueTabToolbar',

    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                this.hasRegisteredActions.registeredActionWithName('bulk-transfer'),
                this.hasRegisteredActions.registeredActionWithName('bulk-clear')
            ]
        });

        this.callParent(arguments);
    }
});
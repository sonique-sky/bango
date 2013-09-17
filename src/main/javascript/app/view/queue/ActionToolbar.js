Ext.define('Spm.view.queue.ActionToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.queueTabToolbar',

    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                this.registeredActions.getByKey('bulk-transfer'),
                this.registeredActions.getByKey('bulk-clear')
            ]
        });

        this.callParent(arguments);
    }
});
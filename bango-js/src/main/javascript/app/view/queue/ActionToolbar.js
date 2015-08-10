Ext.define('Spm.view.queue.ActionToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.queueTabToolbar',

    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                //this.registeredActions.actionNamed('bulk-transfer'),
                //this.registeredActions.actionNamed('bulk-clear')
            ]
        });

        this.callParent(arguments);
    }
});
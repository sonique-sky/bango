Ext.define('Spm.view.component.ActionButton', {
    extend: 'Ext.button.Button',
    alias: 'widget.actionButton',

    config: {
        actionName: undefined
    },

    initComponent: function() {
        Ext.applyIf(this, {
            iconCls: 'icon-' + this.actionName,
            handler: this.scope.startAction
        });

        this.callParent(arguments);
    }
});
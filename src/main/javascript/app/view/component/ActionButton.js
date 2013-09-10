Ext.define('Spm.view.component.ActionButton', {
    extend: 'Ext.button.Button',
    alias: 'widget.actionButton',

    config: {
        actionName: undefined
    },

    initComponent: function() {
        Ext.applyIf(this, {
            itemId : this.actionName,
            iconCls: 'icon-' + this.actionName,
            handler: this.scope.startAction
        });

        Ext.apply(this, {
            focusCls: 'emptyClass'
        });

        this.callParent(arguments);
    }
});
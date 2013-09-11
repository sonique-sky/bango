Ext.define('Spm.view.component.ActionButton', {
    extend: 'Ext.button.Button',
    alias: 'widget.actionButton',

    config: {
        actionName: undefined
    },

    focusCls: 'emptyClass',

    initComponent: function () {
        Ext.applyIf(this, {
            itemId: this.actionName,
            iconCls: 'icon-' + this.actionName,
            handler: this.startAction
        });

        this.callParent(arguments);
    },

    startAction: function (actionButton) {
        var actionContext = this.up('[actionContext]');
        if(actionContext) {
            actionContext.fireEvent('startAction', actionButton.getActionName(), actionContext);
        } else {
            throw new Error(Ext.String.format('Action Error: no action context found for action button {0}.', this.itemId));
        }
    }
});
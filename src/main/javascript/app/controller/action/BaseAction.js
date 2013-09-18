Ext.define('Spm.controller.action.BaseAction', {
    extend: 'Ext.Action',

    config: {
        name: undefined
    },

    startAction: Ext.emptyFn,
    finishAction: Ext.emptyFn,
    updateState: Ext.emptyFn,

    constructor: function (config) {
        config = config || {};
        Ext.apply(config, {
            handler: this.handleAction,
            scope: this,
            focusCls: 'emptyClass'
        });
        this.initConfig(config);
        this.callParent([config]);
    },

    handleAction: function (component) {
        var actionContext = component.up('[actionContext]');
        if (actionContext) {
            this.startAction(actionContext);
        } else {
            throw new Error(Ext.String.format('Action Error: no action context found component {0}.', component.itemId));
        }
    },

    applyFinishStep: function (stepArguments) {
        this.finishAction.apply(this, Array.prototype.slice.call(stepArguments, 1))
    },

    setTooltip: function (tooltip) {
        this.each(function (item) { item.setTooltip(tooltip); }, this);
    }
});
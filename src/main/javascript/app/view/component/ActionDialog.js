Ext.define('Spm.view.component.ActionDialog', {
    extend: 'Spm.view.component.StandardDialog',

    config: {
        actionName: undefined,
        actionContext: undefined
    },

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            collectFn: this.collect
        });

        me.callParent(arguments);
    },

    doCollect: function () {
        return [];
    },

    collect: function () {
        var collected = this.doCollect();
        if (collected instanceof Array) {
            return Ext.Array.merge([this.actionName, this.actionContext], collected);
        }

        throw new Error('function [doCollect] must return an array!');
    },

    onAccept: function () {
        // get the required information from the dialog
        var eventArguments = this.collectFn();
        // push the event type into the first element of the array
        eventArguments.unshift('finishAction');

        // fire event using reflection
        // this causes the 'fireEvent' function to be called but each element of the array 'eventArguments' is
        // passed as a parameter (rather than a single array parameter)
        this.actionContext.fireEvent.apply(this.actionContext, eventArguments);
        this.close();
    }
});

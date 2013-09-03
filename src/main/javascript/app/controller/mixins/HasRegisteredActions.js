Ext.define('Spm.controller.mixins.HasRegisteredActions', {

    constructor: function () {
        this.registeredActions = Ext.create('Ext.util.MixedCollection');
    },

    registerAction: function (action) {
        this.registeredActions.add(action.getName(), action);
    },

    registeredActionWithName: function (actionName) {
        return this.registeredActions.getByKey(actionName);
    }
});
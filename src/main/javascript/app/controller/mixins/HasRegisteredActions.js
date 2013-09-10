Ext.define('Spm.controller.mixins.HasRegisteredActions', {

    constructor: function () {
        this.registeredActions = Ext.create('Ext.util.MixedCollection');
    },

    registerAction: function (action) {
        this.registeredActions.add(action.getName(), action);
    },

    onStartAction: function (actionName) {
        console.log(actionName);
        this.registeredActionWithName(actionName).applyStartStep(arguments);
    },

    onFinishAction: function (actionName) {
        this.registeredActionWithName(actionName).applyFinishStep(arguments);
    },

    registeredActionWithName: function (actionName) {
        return this.registeredActions.getByKey(actionName);
    }
});
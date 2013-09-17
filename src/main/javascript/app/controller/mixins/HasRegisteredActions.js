Ext.define('Spm.controller.mixins.HasRegisteredActions', {

    constructor: function (cfg) {
        var me = this;
        this.registeredActions = Ext.create('Ext.util.MixedCollection');

        Ext.Array.forEach(cfg.registeredActions, function (actionName) {
            me.registerAction(Ext.create(actionName))
        })
    },

    registerAction: function (action) {
        this.registeredActions.add(action.getName(), action);
    },

    onFinishAction: function (actionName) {
        this.registeredActionWithName(actionName).applyFinishStep(arguments);
    },

    registeredActionWithName: function (actionName) {
        return this.registeredActions.getByKey(actionName);
    }
});
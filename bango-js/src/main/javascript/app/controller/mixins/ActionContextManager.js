Ext.define('Spm.controller.mixins.ActionContextManager', {
    requires: ['Spm.controller.mixins.RegisteredActions'],
    keyToRegisteredActionsMap: Ext.create('Ext.util.MixedCollection'),

    registerActionsFor: function(actionContext, actionClassNames) {
        var registeredActions =  Ext.create('Spm.controller.mixins.RegisteredActions', actionClassNames)

        this.keyToRegisteredActionsMap.add(actionContext.actionContextKey(), registeredActions);

        return registeredActions
    },

    deregisterActionsFor: function(actionContext) {
         this.keyToRegisteredActionsMap.removeAtKey(actionContext.actionContextKey());
    },

    registeredActionsFor: function (key) {
        return this.keyToRegisteredActionsMap.getByKey(key);
    },

    onFinishAction: function (actionName, actionContext) {
        var key = actionContext.actionContextKey();
        var action = this.registeredActionsFor(key).actionNamed(actionName);

        action.applyFinishStep(arguments);
    },

    updateActionStates: function (actionContext) {
        var store = Ext.data.StoreManager.lookup('AuthenticatedAgent');
        var registeredActions = this.registeredActionsFor(actionContext.actionContextKey());

        registeredActions.updateState(actionContext, store.authenticatedAgent());
    }
});
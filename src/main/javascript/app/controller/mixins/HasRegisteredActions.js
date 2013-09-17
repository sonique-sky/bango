Ext.define('Spm.controller.mixins.HasRegisteredActions', {
    requires: ['Spm.controller.mixins.RegisteredActions'],
    keyToRegisteredActionsMap: Ext.create('Ext.util.MixedCollection'),

    registerActionsFor: function(key, actionClassNames) {
        var registeredActions =  Ext.create('Spm.controller.mixins.RegisteredActions', actionClassNames)

        this.keyToRegisteredActionsMap.add(key, registeredActions);

        return registeredActions
    },


    deregisterActionsFor: function(key) {
         this.keyToRegisteredActionsMap.removeAtKey(key);
    },

    registeredActionsFor: function (key) {
        return this.keyToRegisteredActionsMap.getByKey(key);
    },

    findAction: function (key, actionName) {
        return this.registeredActionsFor(key).actionNamed(actionName);
    },

    onFinishAction: function (actionName, actionContext) {
        var key = actionContext.actionKey();
        var action = this.findAction(key, actionName);

        action.applyFinishStep(arguments);
    },

    updateActionState: function (actionContext, authenticatedAgent) {
        var registeredActions = this.registeredActionsFor(actionContext.actionKey());

        registeredActions.updateState(actionContext, authenticatedAgent);
    }
});
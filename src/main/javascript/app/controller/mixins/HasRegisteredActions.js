Ext.define('Spm.controller.mixins.HasRegisteredActions', {

    keyToRegisteredActionsMap: Ext.create('Ext.util.MixedCollection'),

    registerActionsFor: function(key, actionClassNames) {
        var actionNameToActionMap = Ext.create('Ext.util.MixedCollection');

        Ext.Array.forEach(actionClassNames, function (actionClassName) {
            var action = Ext.create(actionClassName);
            actionNameToActionMap.add(action.getName(), action);
        });

        this.keyToRegisteredActionsMap.add(key, actionNameToActionMap);

        return actionNameToActionMap
    },


    deregisterActionsFor: function(key) {
         this.keyToRegisteredActionsMap.removeAtKey(key);
    },

    findAction: function (key, actionName) {
        return this.keyToRegisteredActionsMap.getByKey(key).getByKey(actionName);
    },

    onFinishAction: function (actionName, actionContext) {
        var key = actionContext.actionKey();
        var action = this.findAction(key, actionName);

        action.applyFinishStep(arguments);
    }
});
Ext.define('Spm.controller.mixins.RegisteredActions', {

    actionNameToActionMap: undefined,

    constructor: function(actionClassNames) {
        var me = this;

        me.actionNameToActionMap = Ext.create('Ext.util.MixedCollection');

        Ext.Array.forEach(actionClassNames, function (actionClassName) {
            var action = Ext.create(actionClassName);
            me.actionNameToActionMap.add(action.getName(), action);
        });

        me.callParent();
    },

    actionNamed: function(actionName) {
        return this.actionNameToActionMap.getByKey(actionName);
    }
});
Ext.define('Spm.controller.mixins.IsActionContext', {

    requires: [
        'Ext.data.identifier.Uuid'
    ],

    key: undefined,
    actionContext: true,

    constructor: function() {
        this.key = Ext.data.identifier.Uuid.createRandom();

        this.callParent(arguments);
    },

    actionContextKey: function() {
        return this.key;
    }
});

Ext.define('Spm.controller.mixins.IsActionContext', {

    requires: [
        'Ext.data.identifier.Uuid'
    ],

    key: undefined,
    actionContext: true,

    constructor: function() {
        this.key = new Ext.data.identifier.Uuid().generate();
        this.callParent(arguments);
    },

    actionContextKey: function() {
        return this.key;
    }
});

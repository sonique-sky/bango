Ext.define('Spm.controller.mixins.IsActionContext', {

    requires: [
        'Ext.data.UuidGenerator'
    ],

    key: undefined,
    actionContext: true,

    constructor: function() {
        this.key = Ext.data.IdGenerator.get('uuid').generate();

        this.callParent(arguments);
    },

    actionContextKey: function() {
        return this.key;
    }
});

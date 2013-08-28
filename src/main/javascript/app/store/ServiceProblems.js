Ext.define('Spm.store.ServiceProblems', {
    extend: 'Ext.data.Store',
    alias: 'store.serviceProblems',

    requires: [
        'Spm.model.ServiceProblem'
    ],

   constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            filterOnLoad: false,
            model: 'Spm.model.ServiceProblem',
            sortOnLoad: false,
            proxy: {
                type: 'ajax',
                url: 'api/queue/list',
                reader: {
                    type: 'json'
                }
            }
        }, cfg)]);
    }
});
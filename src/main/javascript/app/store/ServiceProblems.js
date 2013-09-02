Ext.define('Spm.store.ServiceProblems', {
    extend: 'Ext.data.Store',
    alias: 'store.serviceProblems',

    statics: {
        queueServiceProblemStore: function() {
            return Ext.create('Spm.store.ServiceProblems', {proxyUrl: 'api/queue/list'});
        },
        searchServiceProblemStore: function() {
            return Ext.create('Spm.store.ServiceProblems', {proxyUrl: 'api/search/simple'});
        }
    },

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
                url: cfg.proxyUrl,
                reader: {
                    type: 'json'
                }
            }
        }, cfg)]);
    }
});
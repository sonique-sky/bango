Ext.define('Spm.store.ServiceProblems', {
    extend: 'Ext.data.Store',
    alias: 'store.serviceProblems',

    statics: {
        queueServiceProblemStore: function() {
            return Ext.create('Spm.store.ServiceProblems', {proxy: Spm.proxy.ApiProxy});
        },
        serviceProblemSearchStore: function() {
            return Ext.create('Spm.store.ServiceProblems', {proxy: Spm.proxy.ApiProxy});
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
            sortOnLoad: false
        }, cfg)]);
    }
});
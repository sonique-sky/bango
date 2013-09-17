Ext.define('Spm.store.ServiceProblems', {
    extend: 'Ext.data.Store',
    alias: 'store.serviceProblems',

    statics: {
        queueServiceProblemStore: function() {
            return Ext.create('Spm.store.ServiceProblems', {operationFactory: Spm.proxy.ApiOperation.queueServiceProblems, proxy: Spm.proxy.ServiceProblemApiProxy});
        },
        serviceProblemSearchStore: function() {
            return Ext.create('Spm.store.ServiceProblems', {operationFactory: Spm.proxy.ApiOperation.search, proxy: Spm.proxy.ServiceProblemApiProxy});
        },
        myItemsServiceProblemStore: function() {
            return Ext.create('Spm.store.ServiceProblems', {operationFactory: Spm.proxy.ApiOperation.myItems, proxy: Spm.proxy.ServiceProblemApiProxy});
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
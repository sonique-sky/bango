Ext.define('Spm.store.EventHistory', {
    extend: 'Ext.data.Store',
    alias: 'store.eventHistory',
    model: 'Spm.model.EventHistoryItem',
    filterOnLoad: false,

    requires: [
        'Spm.model.EventHistoryItem',
        'Spm.proxy.EventHistoryApiProxy'
    ],

    statics: {
        eventHistoryStore: function () {
            return Ext.create('Spm.store.EventHistory', {operationFactory: Spm.proxy.ApiOperation.serviceProblemEventHistory, proxy: Spm.proxy.EventHistoryApiProxy});
        }
    }
});
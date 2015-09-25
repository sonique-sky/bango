Ext.define('Spm.store.EventHistory', {
    extend: 'Ext.data.Store',
    alias: 'store.eventHistory',

    model: 'Spm.model.EventHistoryItem',
    proxy: 'serviceProblemEventHistoryProxy',
    remoteSort: true,
    pageSize: 0,
    sorters: 'eventType',

    load: function (options) {
        this.callParent({params: {serviceProblemId: 2}});
    }

});
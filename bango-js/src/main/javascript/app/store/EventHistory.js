Ext.define('Spm.store.EventHistory', {
    extend: 'Ext.data.Store',
    alias: 'store.eventHistory',

    requires: [
        'Spm.model.EventHistoryItem',
        'Spm.proxy.ServiceProblemEventHistoryProxy'
    ],

    model: 'Spm.model.EventHistoryItem',
    proxy: 'serviceProblemEventHistoryProxy',
    remoteSort: true,
    pageSize: 0,
    sorters: [
        {
            property: 'createdDate',
            direction: 'DESC'
        }
    ],

    config: {
        entityIdentifier: undefined
    },

    load: function (options) {
        this.callParent([{params: {entityIdentifier: this.getEntityIdentifier()}}]);
    }
});
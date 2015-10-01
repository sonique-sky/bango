Ext.define('Spm.store.EventHistory', {
    extend: 'Ext.data.Store',
    alias: 'store.eventHistory',

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
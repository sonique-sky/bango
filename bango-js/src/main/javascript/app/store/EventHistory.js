Ext.define('Spm.store.EventHistory', {
    extend: 'Ext.data.Store',
    alias: 'store.eventHistory',

    model: 'Spm.model.EventHistoryItem',
    proxy: {
        type: 'ajax',
        url: 'api/eventHistory',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
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
        var args = Array.from(arguments);
        args.push({params: {entityIdentifier: this.getEntityIdentifier()}});
        this.callParent(args);
    }
});
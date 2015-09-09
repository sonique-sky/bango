Ext.define('Spm.store.Queues', {
    extend: 'Ext.data.Store',
    alias: 'store.queues',

    requires: [
        'Spm.model.Queue'
    ],
    model: 'Spm.model.Queue',

    sorters: 'name',

    proxy: {
        type: 'rest',
        appendId: false,
        url: 'api/queue',
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});
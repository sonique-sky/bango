Ext.define('Spm.model.Queue', {
    extend: 'Ext.data.Model',
    alias: 'model.queue',

    idProperty: 'id',
    identifier: 'negative',

    fields: [
        {
            name: 'id',
            mapping: 'queueId'
        },
        {
            name: 'name',
            critical: true
        }
    ],

    proxy: {
        type: 'rest',
        appendId: false,
        url: 'api/queue',
        reader: {
            type: 'json',
            rootProperty: 'onePageOfSearchResults',
            totalProperty: 'totalRecordCount'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }
    },

    queueId: function () {
        return this.get('id');
    },

    queueName: function () {
        return this.get('name');
    }
});
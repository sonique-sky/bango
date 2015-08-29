Ext.define('Spm.model.Queue', {
    extend: 'Ext.data.Model',
    alias: 'model.queue',

    idProperty: 'id',

    fields: [
        {
            name: 'id',
            mapping: 'queueId'
        },
        {
            name: 'name'
        }
    ],

    proxy: {
        type: 'rest',
        appendId: false,
        url: 'api/queue',
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
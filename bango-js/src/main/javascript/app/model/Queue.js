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

    queueId: function() {
        return this.get('id');
    },

    queueName: function() {
        return this.get('name');
    }
});
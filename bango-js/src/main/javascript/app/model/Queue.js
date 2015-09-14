Ext.define('Spm.model.Queue', {
    extend: 'Ext.data.Model',
    alias: 'model.queue',

    requires: [
        'Ext.data.identifier.Negative'
    ],

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

    queueId: function () {
        return this.get('id');
    },

    queueName: function () {
        return this.get('name');
    }
});
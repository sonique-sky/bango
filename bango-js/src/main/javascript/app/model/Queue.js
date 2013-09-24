Ext.define('Spm.model.Queue', {
    extend: 'Ext.data.Model',
    alias: 'model.queue',

    fields: [
        {
            name: 'id'
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
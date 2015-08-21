Ext.define('Spm.model.Team', {
    extend: 'Ext.data.Model',
    alias: 'model.team',

    fields: [
        {
            mapping: 'id.value',
            name: 'id'
        },
        {
            mapping: 'name.value',
            name: 'name'
        }
    ],

    hasMany: {
        model: 'Spm.model.Queue',
        name: 'assignedQueues',
        associationkey: 'assignedQueues'
    },

    proxy: {
        type: 'rest',
        url: 'api/teams',
        appendId: false
    }

});
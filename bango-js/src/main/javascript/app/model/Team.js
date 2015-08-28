Ext.define('Spm.model.Team', {
    extend: 'Ext.data.Model',
    alias: 'model.team',
    requires: [
        'Spm.model.Queue'
    ],

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

    hasMany: [{
        name: 'assignedQueues',
        model: 'Spm.model.Queue',
        associationKey: 'assignedQueues'
    }],

    proxy: {
        type: 'rest',
        appendId: false,
        url: 'api/team',
        reader: {
            type: 'json',
            rootProperty: 'onePageOfSearchResults',
            totalProperty: 'totalRecordCount'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});
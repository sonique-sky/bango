Ext.define('Spm.model.Team', {
    extend: 'Ext.data.Model',
    alias: 'model.team',
    requires: [
        'Spm.model.Queue'
    ],

    fields: [
        {
            name: 'id',
            critical: true
        },
        {
            name: 'name',
            critical: true
        },
        {
            name: 'description'
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
            writeAllFields: false,
            partialDataOptions: {
                associated: true
            }
        }
    },

    teamId: function () {
        return this.get('id');
    }
});
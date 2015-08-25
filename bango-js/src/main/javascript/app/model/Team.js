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

    proxy: {
        type: 'rest',
        appendId: false,
        url: 'api/team'
    }

});
Ext.define('Spm.model.Agent', {
    extend: 'Ext.data.Model',
    alias: 'model.agent',

    fields: [
        {
            name: 'code'
        },
        {
            name: 'displayName',
            mapping: 'details.displayName'
        },
        {
            name: 'role'
        }
    ],

    hasPrivilege: function (privilege) {
        return Ext.Array.contains(this.get('role').privileges, privilege);
    },

    proxy: {
        type: 'rest',
        appendId: false,
        url: 'api/agent',
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
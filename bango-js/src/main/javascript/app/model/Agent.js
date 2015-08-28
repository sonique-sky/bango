Ext.define('Spm.model.Agent', {
    extend: 'Ext.data.Model',
    alias: 'model.agent',

    fields: [
        {
            name: 'code',
            mapping: 'agentCode'
        },
        {
            name: 'displayName',
            mapping: 'details.displayName'
        },
        {
            name: 'role'
        },
        {
            name: 'team',
            reference: 'Spm.model.Team',
            unique: true
        },
        {
            name: 'teamName',
            mapping: 'team.name'
        },
        {
            name: 'roleName',
            mapping: 'role.description'
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
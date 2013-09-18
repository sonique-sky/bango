Ext.define('Spm.model.Agent', {
    extend: 'Ext.data.Model',
    alias: 'model.agent',

    fields: [
        {
            name: 'code'
        },
        {
            name: 'availability'
        },
        {
            name: 'activeCount'
        },
        {
            name: 'heldCount'
        },
        {
            mapping: 'details.firstName',
            name: 'firstName'
        },
        {
            mapping: 'details.lastName',
            name: 'lastName'
        },
        {
            convert: function (v, rec) {
                return rec.get('firstName') + ' ' + rec.get('lastName');
            },
            name: 'displayName'
        },
        {
            mapping: 'role.privileges',
            name: 'privileges'
        }
    ],

    hasPrivilege: function(privilege) {
        return Ext.Array.contains(this.get('privileges'), privilege);
    }
});
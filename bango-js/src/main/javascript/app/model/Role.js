Ext.define('Spm.model.Role', {
    extend: 'Ext.data.Model',
    alias: 'model.role',

    idProperty: 'name',

    fields: [
        {
            name: 'name',
            critical: true
        },
        {
            name: 'description'
        },
        {
            name: 'privileges'
        }
    ]

});

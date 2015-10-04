Ext.define('Spm.store.Teams', {
    extend: 'Ext.data.Store',
    alias: 'store.teams',

    requires: [
        'Ext.data.proxy.Rest',
        'Spm.model.Team'
    ],

    model: 'Spm.model.Team',

    sorters: 'name',
    remoteSort: true,
    remoteFilter: true,

    proxy: {
        type: 'rest',
        appendId: false,
        url: 'api/team',
        reader: {
            type: 'json',
            rootProperty: 'data',
            implicitIncludes: false
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});
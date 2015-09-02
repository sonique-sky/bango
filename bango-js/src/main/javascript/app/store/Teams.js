Ext.define('Spm.store.Teams', {
    extend: 'Ext.data.Store',
    alias: 'store.teams',

    requires: [
        'Spm.model.Team'
    ],
    model: 'Spm.model.Team',

    sorters: 'name',

    proxy: {
        type: 'rest',
        appendId: false,
        url: 'api/team',
        reader: {
            type: 'json',
            rootProperty: 'onePageOfSearchResults',
            totalProperty: 'totalRecordCount',
            implicitIncludes: false
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});
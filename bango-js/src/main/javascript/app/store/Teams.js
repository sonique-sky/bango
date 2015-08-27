Ext.define('Spm.store.Teams', {
    extend: 'Ext.data.Store',
    alias: 'store.teams',

    requires: [
        'Spm.model.Team'
    ],
    model: 'Spm.model.Team',

    sorters: 'name'
});
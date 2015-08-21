Ext.define('Spm.store.Teams', {
    extend: 'Ext.data.Store',
    alias: 'store.teams',

    model: 'Spm.model.Team',

    sorters: 'name',

    proxy: {type: 'teamsProxy'}

});
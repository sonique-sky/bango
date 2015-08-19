Ext.define('Spm.store.AdminDashboardTeams', {
    extend: 'Ext.data.Store',
    alias: 'store.adminTeams',

    model: 'Spm.model.Team',
    proxy: {type: 'adminTeamsProxy'}
});
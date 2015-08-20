Ext.define('Spm.view.admindashboard.teams.TeamAdminTabViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.teamAdminTab',

    onActivated: function () {
        this.getViewModel().getStore('teams').load();
    },

    onTeamStoreLoaded: function (store) {
        this.lookupReference('teamGrid').setSelection(store.first());
    },

    createNewTeam: function () {
        console.log('hey');
    }
});
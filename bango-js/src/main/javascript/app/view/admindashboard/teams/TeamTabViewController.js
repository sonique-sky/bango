Ext.define('Spm.view.admindashboard.teams.TeamTabViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.adminTeamsTab',

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
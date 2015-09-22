Ext.define('Spm.view.dashboard.admin.teams.TeamAdminTabViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.teamAdminTab',

    listen: {
        controller: {
            'queueAssignment': {
                teamUpdateFailed: 'reloadStore'
            }
        }
    },

    loadTeamsStore: function () {
        var store = this.getStore('teams');
        if (store && !store.isLoaded()) {
            store.load();
        }
    },

    reloadStore: function () {
        this.getStore('teams').reload();
    },

    onTeamStoreLoaded: function (store) {
        this.getView().setSelection(store.first());
    },

    createNewTeam: function () {
        this.getView().add({xtype: 'createTeamDialog'}).show();
    },

    assignQueuesToTeam: function () {
        this.getView().add({xtype: 'queueAssignment', team: this.selectedTeam()}).show();
    },

    selectedTeam: function () {
        return this.getView().getSelectionModel().getSelection()[0];
    },

    deleteTeam: function () {
        var me = this,
            selectedTeam = me.selectedTeam(),
            teamStore = me.getStore('teams');

        Ext.Msg.show({
            title: 'Delete Team',
            msg: 'Do you want to delete this team?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,

            callback: function (buttonId) {
                if ('yes' == buttonId) {
                    teamStore.remove(selectedTeam);
                    teamStore.sync({
                        failure: me.loadStore
                    });
                }
            }
        });
    }
});

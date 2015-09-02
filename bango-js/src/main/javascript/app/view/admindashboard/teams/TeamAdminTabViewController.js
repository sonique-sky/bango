Ext.define('Spm.view.admindashboard.teams.TeamAdminTabViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.teamAdminTab',

    listen: {
        controller: {
            'queueAssignment' : {
                teamUpdateFailed: 'reloadStore'
            }
        }
    },

    loadStore: function () {
        this.getStore('teams').load();
    },

    reloadStore: function () {
        this.getStore('teams').reload();
    },

    onTeamStoreLoaded: function (store) {
        this.getView().setSelection(store.first());
    },

    createNewTeam: function () {
        var dialog = this.getView().add({
            xtype: 'createTeamDialog'
        });

        dialog.show();
    },

    selectedTeam: function () {
        return this.getView().getSelectionModel().getSelection()[0];
    },

    assignQueuesToTeam: function () {
        var dialog = this.getView().add({
            xtype: 'queueAssignment',
            viewModel: {
                data: {
                    team: this.selectedTeam()
                }
            }
        });

        dialog.show();
    },

    deleteTeam: function () {
        var me = this;
        var selectedTeam = this.selectedTeam();
        var teamStore = this.getStore('teams');
        Ext.Msg.show({
            title: 'Delete Team',
            msg: 'Do you want to delete this team?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,

            callback: function (buttonId) {
                if ('yes' == buttonId) {
                    teamStore.remove(selectedTeam);
                    teamStore.sync({
                        failure: function () {
                            me.loadStore();
                        }
                    });
                }
            }
        });
    }
});
Ext.define('Spm.view.admindashboard.teams.TeamAdminTabViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.teamAdminTab',

    loadStore: function () {
        this.getViewModel().getStore('teams').load();
    },

    onTeamStoreLoaded: function (store) {
        this.lookupReference('teamGrid').setSelection(store.first());
    },

    createNewTeam: function () {
        var dialog = this.getView().add({
            xtype: 'createTeamDialog'
        });

        dialog.show();
    },

    selectedTeam: function () {
        return this.lookupReference('teamGrid').getSelectionModel().getSelection()[0];
    },

    assignQueuesToTeam: function () {
        var dialog = this.getView().add({
            xtype: 'queueAssignmentDialog',
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
        Ext.Msg.show({
            title: 'Delete Team',
            msg: 'Do you want to delete this team?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,

            callback: function (buttonId) {
                if ('yes' == buttonId) {
                    selectedTeam.drop();
                    selectedTeam.save({
                        success: function (team){

                        },
                        failure: function (resp){
                            me.loadStore();
                        }
                    });
                }
            }
        });
    }
});
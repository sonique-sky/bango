Ext.define('Spm.view.dashboard.admin.agents.reassign.ReassignAgentDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.reassignAgentDialog',

    onShow: function () {
        var agent = this.getViewModel().agent();
        var teamsStore = this.getStore('teams');
        teamsStore.filterBy(function (team) {
            return team.teamId() !== agent.getTeam().teamId();
        });
        teamsStore.load();
    },

    onAccept: function () {
        var me = this;
        var viewModel = me.getViewModel();
        Ext.Ajax.request(
            {
                url: Ext.String.format('api/agent/reassign'),
                method: 'POST',
                jsonData: {
                    agent: viewModel.agent().agentCode(),
                    currentTeam: viewModel.currentTeam().teamId(),
                    newTeam: me.selectedTeam().teamId()
                },
                success: function () {
                    me.fireEvent('agentReassigned');
                    me.getView().close();
                }
            }
        );
    },

    selectedTeam: function () {
        return this.lookupReference('teamsGrid').getSelectionModel().getSelection()[0];
    },

    onTeamStoreLoaded: function (store) {
        this.lookupReference('teamsGrid').setSelection(store.first());
    }

});

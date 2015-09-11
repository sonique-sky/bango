Ext.define('Spm.view.dashboard.admin.agents.reassign.ReassignAgentDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.reassignAgentDialog',

    onShow: function () {
        var me = this;
        var agent = this.getViewModel().agent();
        var teamsStore = this.getStore('teams');
        teamsStore.filterBy(function (team) {
            return team.getData().id !== agent.team.id;
        });
        teamsStore.load({
            callback: function (records, operation, success) {
                if (me.getViewModel().currentTeam().id !== records[0].id) {
                    me.lookupReference('teamsGrid').setSelection(records[0]);
                    me.getViewModel().set('newTeam', records[0]);
                } else {
                    me.lookupReference('teamsGrid').setSelection(records[1]);
                    me.getViewModel().set('newTeam', records[1]);
                }
            }
        });
    },

    onSelectTeam: function (view, td, cellIndex, record) {
        this.getViewModel().set('newTeam', record.getData());
    },

    onAccept: function () {
        var viewModel = this.getViewModel();
        var me = this;
        Ext.Ajax.request(
            {
                url: Ext.String.format('api/agent/reassign'),
                method: 'POST',
                jsonData: {
                    agent: viewModel.agent().agentCode,
                    currentTeam: viewModel.currentTeam().id,
                    newTeam: viewModel.newTeam().id
                },
                success: function () {
                    me.fireEvent('agentReassigned');
                    me.getView().close();
                }
            }
        );
    }

})
;
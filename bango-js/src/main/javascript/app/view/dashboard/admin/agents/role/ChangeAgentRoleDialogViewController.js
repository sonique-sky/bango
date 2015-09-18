Ext.define('Spm.view.dashboard.admin.agents.role.ChangeAgentRoleDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.changeAgentRoleDialog',

    initViewModel: function (viewModel) {
        var me = this,
            agent = me.getView().agent;

        viewModel.set('agent', agent);
        me.lookupReference('teamComboBox').setSelection(agent.getTeam());
        me.lookupReference('roleComboBox').setSelection(agent.getRole());
    },

    onAccept: function () {
        var me = this,
            team = me.lookupReference('teamComboBox').getSelection(),
            role = me.lookupReference('roleComboBox').getSelection(),
            agentStore = me.getViewModel().get('agents'),
            agent = me.getView().agent;

        agent.set('role', role.getData());
        agent.set('team', team ? team.getData() : {});

        agentStore.sync({
            callback: function () {
                me.getViewModel().get('agents').reload();
                me.closeView();
            }
        });
    },

    onRoleSelected: function (combo, record) {
        var teamComboBox = this.lookupReference('teamComboBox');
        if (!record.mayBeTeamMember()) {
            teamComboBox.clearValue();
            teamComboBox.disable();
        } else {
            teamComboBox.enable();
        }
    }

});

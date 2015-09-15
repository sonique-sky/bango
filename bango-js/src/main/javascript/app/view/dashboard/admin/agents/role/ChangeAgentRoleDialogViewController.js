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

        agent.set('team', team.getData());
        agent.set('role', role.getData());

        agentStore.add(agent);
        agentStore.sync({
            callback: function () {
                debugger;
            },
            success: function () {
                debugger;
                me.closeView();
            },
            failure: function () {
                debugger;
            }
        });
    },

    onRoleSelected: function (combo, record) {
        var teamComboBox = this.lookupReference('teamComboBox');
        if (record.get('name') === 'ROLE_QUEUE_CONTROLLER') {
            teamComboBox.clearValue();
            teamComboBox.disable();
        } else {
            teamComboBox.enable();
        }
    }

});

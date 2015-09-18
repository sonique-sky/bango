Ext.define('Spm.view.dashboard.admin.agents.create.CreateAgentDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.createAgentDialog',

    initViewModel: function (viewModel) {
        viewModel.set('agent', this.getView().agent);
    },

    onAccept: function () {
        var me = this,
            agentStore = me.getViewModel().get('agents'),
            agent = me.getViewModel().get('agent'),
            team = me.lookupReference('teamComboBox').getSelection(),
            role = me.lookupReference('roleComboBox').getSelection(),
            userName = me.lookupReference('userNameTextField').getValue(),
            firstName = me.lookupReference('firstNameTextField').getValue(),
            lastName = me.lookupReference('lastNameTextField').getValue();

        agent.set('agentCode', userName);
        agent.set('details', {firstName: firstName, lastName: lastName});
        agent.set('role', role.getData());
        agent.set('team', team ? team.getData() : {});

        agentStore.add(agent);

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
    },

    onValidityChange: function (form, isValid) {
        this.getViewModel().set('acceptButtonDefaultDisabled', !isValid);
    }

});

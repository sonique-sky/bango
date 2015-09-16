Ext.define('Spm.view.dashboard.admin.agents.create.CreateAgentDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.createAgentDialog',

    initViewModel: function (viewModel) {
        viewModel.set('agent', this.getView().agent);
    },


    onAccept: function () {
        //var me = this,
        //    viewModel = me.getViewModel();
        //
        //Ext.Ajax.request(
        //    {
        //        url: Ext.String.format('api/agent'),
        //        method: 'PUT',
        //        jsonData: {
        //            agentCode: viewModel.get('agentCode'),
        //            firstName: viewModel.get('firstName'),
        //            lastName: viewModel.get('lastName'),
        //            role: viewModel.get('role'),
        //            team: viewModel.get('team', team ? team.getData() : {})
        //        },
        //        success: function () {
        //            me.closeView();
        //        },
        //        failure: function() {
        //            debugger;
        //        }
        //    }
        //);

        var me = this,
            agentStore = me.getViewModel().get('agents'),
            agent = me.getView().agent,
            team = me.lookupReference('teamComboBox').getSelection(),
            role = me.lookupReference('roleComboBox').getSelection(),
            userName = me.lookupReference('userNameTextField').getValue(),
            firstName = me.lookupReference('firstNameTextField').getValue(),
            lastName = me.lookupReference('lastNameTextField').getValue();

        agent.set('agentCode', userName);
        agent.set('detail', {firstName: firstName, lastName: lastName});
        agent.set('role', role.getData());
        agent.set('team', team ? team.getData() : {});
        agentStore.add(agent);

        debugger;

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
    }

});

Ext.define('Spm.view.dashboard.admin.agents.AgentAdminTabViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.agentAdminTab',

    requires: [
        'Spm.view.dashboard.admin.agents.create.CreateAgentDialog',
        'Spm.view.dashboard.admin.agents.reassign.ReassignAgentDialog',
        'Spm.view.dashboard.admin.agents.reassign.ReassignAgentDialogViewModel',
        'Spm.view.dashboard.admin.agents.role.ChangeAgentRoleDialog',
        'Spm.view.dashboard.admin.agents.role.ChangeAgentRoleDialogViewModel'
    ],

    listen: {
        controller: {
            'reassignAgentDialog': {
                agentReassigned: 'loadStore'
            }
        }
    },

    loadStore: function () {
        this.getView().getStore().load();
    },

    onAgentStoreLoaded: function (store) {
        this.getView().setSelection(store.first());
    },

    selectedAgent: function () {
        return this.getView().getSelectionModel().getSelection()[0];
    },

    reassignAgent: function () {
        var agent = this.getViewModel().agent();
        var dialog = this.getView().add({
            xtype: 'reassignAgentDialog',
            viewModel: {
                type: 'reassignAgentDialog',
                data: {
                    agent: agent
                }
            }
        });
        dialog.show();
    },

    deleteAgent: function () {
        var me = this,
            selectedAgent = me.selectedAgent(),
            agentStore = me.getViewModel().getStore('agents');

        Ext.Msg.show({
            title: 'Delete Agent',
            msg: Ext.String.format('Are you sure you wish to delete agent [{0}]?', selectedAgent.agentCode()),
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            callback: function (buttonId) {
                if ('yes' == buttonId) {
                    agentStore.remove(selectedAgent);
                    agentStore.sync({
                        failure: function () {
                            me.loadStore();
                        }
                    });
                    me.selectFirstRow(agentStore);
                }
            }
        });
    },

    changeAgentRole: function () {
        var agent = this.getViewModel().agent();
        var dialog = this.getView().add({
            xtype: 'changeAgentRoleDialog',
            viewModel: {
                type: 'changeAgentRoleDialog',
                data: {
                    agent: agent
                }
            }
        });
        dialog.show();
    },

    createAgent: function () {
        var dialog = Ext.create('Spm.view.dashboard.admin.agents.create.CreateAgentDialog');
        this.getView().add(dialog);
        dialog.show();
    },

    onSelectAgent: function (component, record) {
        this.getViewModel().set('isLoggedInAgent', record.agentCode() === this.getViewModel().authenticatedAgent().agentCode());
    }
});

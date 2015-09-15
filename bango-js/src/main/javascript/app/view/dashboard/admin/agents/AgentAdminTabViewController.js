Ext.define('Spm.view.dashboard.admin.agents.AgentAdminTabViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.agentAdminTab',

    requires: [
        'Spm.view.dashboard.admin.agents.create.CreateAgentDialog',
        'Spm.view.dashboard.admin.agents.reassign.ReassignAgentDialog',
        'Spm.view.dashboard.admin.agents.role.ChangeAgentRoleDialog'
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

    onSelectAgent: function (component, agent) {
        this.getViewModel().set('isLoggedInAgent', agent.agentCode() === this.getViewModel().authenticatedAgent().agentCode());
    },

    selectedAgent: function () {
        return this.getView().getSelectionModel().getSelection()[0];
    },

    reassignAgent: function () {
        this.getView().add({xtype: 'reassignAgentDialog', agent: this.selectedAgent()}).show();
    },

    changeAgentRole: function () {
        this.getView().add({xtype: 'changeAgentRoleDialog', agent: this.selectedAgent()}).show();
    },

    createAgent: function () {
        this.getView().add({xtype: 'createAgent'}).show();
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
    }

});

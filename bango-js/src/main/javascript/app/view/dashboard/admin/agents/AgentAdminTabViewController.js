Ext.define('Spm.view.dashboard.admin.agents.AgentAdminTabViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.agentAdminTab',

    listen: {
        controller: {
            'reassignAgentDialog': {
                agentReassigned: 'onAgentReassigned'
            }
        }
    },

    onAgentReassigned: function () {
        this.getView().getStore().load();
    },

    loadStore: function () {
        var store = this.getView().getStore();
        if (store && !store.isLoaded()) {
            store.load();
        }
        var firstAgent = store.first();
        this.getViewModel().set('agent', firstAgent.getData());
    },

    onAgentStoreLoaded: function (store) {
        this.getView().setSelection(store.first());
        this.getViewModel().set('agent', store.first().getData());
    },

    onSelectAgent: function (view, td, cellIndex, record) {
        this.getViewModel().set('agent', record.getData());
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

    createAgent: function () {
        var dialog = Ext.create('Spm.view.dashboard.admin.agents.create.CreateAgentDialog');

        this.getView().add(dialog);

        dialog.show();
    }
});

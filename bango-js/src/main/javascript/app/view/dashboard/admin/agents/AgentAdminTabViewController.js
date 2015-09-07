Ext.define('Spm.view.dashboard.admin.agents.AgentAdminTabViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.agentAdminTab',
    require: [
        'Spm.view.dashboard.admin.agents.create.CreateAgentDialog'
    ],

    loadStore: function () {
        var store = this.getView().getStore();
        if (store && !store.isLoaded()) {
            store.load();
        }
    },

    onAgentStoreLoaded: function (store) {
        this.getView().setSelection(store.first());
    },

    foo: function() {
        console.log('Crazy foo!')
    },

    createAgent: function () {
        var dialog = Ext.create('Spm.view.dashboard.admin.agents.create.CreateAgentDialog', {

        }).show()
    }
});

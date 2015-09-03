Ext.define('Spm.view.admindashboard.agents.AgentAdminTabViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.agentAdminTab',
    require: [
        'Spm.view.admindashboard.agents.create.CreateAgentDialog'
    ],

    loadStore: function () {
        this.getViewModel().getStore('agents').load();
    },

    onAgentStoreLoaded: function (store) {
        this.getView().setSelection(store.first());
    },

    foo: function() {
        console.log('Crazy foo!')
    },

    createAgent: function () {
        var dialog = Ext.create('Spm.view.admindashboard.agents.create.CreateAgentDialog', {

        }).show()
    }
});
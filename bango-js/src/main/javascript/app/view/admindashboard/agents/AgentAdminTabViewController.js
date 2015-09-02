Ext.define('Spm.view.admindashboard.agents.AgentAdminTabViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.agentAdminTab',

    loadStore: function () {
        this.getViewModel().getStore('agents').load();
    },

    onAgentStoreLoaded: function (store) {
        this.getView().setSelection(store.first());
    },

    foo: function() {
        console.log('Crazy foo!')
    }
});
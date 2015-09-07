Ext.define('Spm.view.dashboard.agent.AgentDashboardViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.agentDashboard',

    loadStore: function () {
        var store = this.getView().getStore();
        if (store && !store.isLoaded()) {
            store.load();
        }
    }
});

Ext.define('Spm.view.dashboard.agent.AgentDashboardViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.agentDashboard',

    loadStore: function() {
        this.getStore('agents').load();
    }
});

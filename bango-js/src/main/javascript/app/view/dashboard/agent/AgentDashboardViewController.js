Ext.define('Spm.view.dashboard.agent.AgentDashboardViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.agentDashboard',

    loadStore: function () {
        var store = this.getView().getStore();
        if (store && !store.isLoaded()) {
            store.load();
        }
    },

    availabilityDurationRenderer: function (timeChange) {
        if (Ext.Object.isEmpty(timeChange)) {
            return 'N/A';
        } else {
            var availabilityLastChanged = Ext.Date.parse(timeChange, 'd/m/Y H:i:s'),
                now = new Date();
            return Ext.Date.diff(availabilityLastChanged, now, Ext.Date.MINUTE);
        }
    },

    agentStatusRenderer: function (status, meta) {
        meta.tdCls = Ext.String.format('user-status-{0}', Ext.util.Format.lowercase(status));
        return status;
    }
});

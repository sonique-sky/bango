Ext.define('Spm.view.dashboard.agent.AgentDashboardViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.agentDashboard',

    loadStore: function () {
        var store = this.getView().getStore();
        if (store && !store.isLoaded()) {
            store.load();
        }
    },

    calculateAvailabilityDuration: function (timeChange) {
        if (Ext.Object.isEmpty(timeChange)) {
            return 'N/A';
        } else {
            var date = Ext.Date.parse(timeChange, 'd/m/Y H:i:s');
            var now = new Date();
            if (Ext.Date.isDST(now)) { //TODO: Superman should stop using java.util.Date
                date = Ext.Date.add(date, Ext.Date.HOUR, 1);
            }
            return Ext.Date.diff(date, now, Ext.Date.MINUTE);
        }
    }
});

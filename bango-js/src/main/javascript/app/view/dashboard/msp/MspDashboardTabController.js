Ext.define('Spm.view.dashboard.msp.MspDashboardTabController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mspDashboard',

    loadMspStore: function () {
        var store = this.getViewModel().getStore('mspDashboardEntries');
        if (store && !store.isLoaded()) {
            store.load();
        }
    }

});
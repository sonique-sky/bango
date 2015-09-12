Ext.define('Spm.view.dashboard.msp.MspDashboardTabController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mspDashboard',


    loadStore: function( ) {
        this.getViewModel().getStore('mspDashboardEntries').load();
    }
});
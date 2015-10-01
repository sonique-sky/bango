Ext.define('Spm.view.dashboard.msp.MspDashboardTabController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mspDashboard',


    loadStore: function () {
        this.getViewModel().getStore('mspDashboardEntries').load();
    },

    selectMajorServiceProblem: function (component, td, cellIndex, record, tr, rowIndex, e) {
        var eventHistoryPanel = this.lookupReference('eventHistoryPanel');
        eventHistoryPanel.fireEvent('serviceProblemLoaded', record.getId());
    }

});
Ext.define('Spm.view.dashboard.msp.MspDashboardTabController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mspDashboard',


    loadMspStore: function () {
        this.getViewModel().getStore('mspDashboardEntries').load();
    },

    selectMajorServiceProblem: function (component, td, cellIndex, record, tr, rowIndex, e) {
        var eventHistoryPanel = this.lookupReference('eventHistoryPanel');
        eventHistoryPanel.fireEvent('serviceProblemLoaded', record.getId());
    },

    showRecentlyClosed: function (checkbox, checked) {
        var store = this.getViewModel().getStore('mspDashboardEntries');
        checked ? store.filter('showRecentlyClosed', true) : store.removeFilter('showRecentlyClosed');
        this.getViewModel().set('displayRecentlyClosed', checked);
    },

    hideManuallyCreated: function (checkbox, checked) {
        var store = this.getViewModel().getStore('mspDashboardEntries');
        checked ? store.filter('hideManuallyCreated', true) : store.removeFilter('hideManuallyCreated');
    }

});
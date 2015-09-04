Ext.define('Spm.view.queuedashboard.QueueDashboardTabViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.queueDashboard',

    loadStore: function () {
        this.getStore('queueDashboardEntries').load();
    },

    onCellClicked: function (view, td, cellIndex, record) {
        this.fireEvent('queueSelected', record.queue());
    }
});
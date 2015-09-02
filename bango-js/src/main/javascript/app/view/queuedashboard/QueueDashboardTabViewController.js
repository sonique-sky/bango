Ext.define('Spm.view.queuedashboard.QueueDashboardTabViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.queueDashboard',

    refreshPeriodChanged: function(item) {
        console.log(item.value, item.text);
    }
});
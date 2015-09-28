Ext.define('Spm.view.dashboard.queue.QueueDashboardTabViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.queueDashboard',

    requires: [
        'Spm.model.Queue'
    ],

    loadQueuesStore: function () {
        var store = this.getViewModel().get('queueDashboardEntries');
        if (store && !store.isLoaded()) {
            store.load();
        }
    },

    onCellClicked: function (view, td, cellIndex, record) {
        this.fireEvent('queueSelected',
            new Spm.model.Queue({
                id: record.get('queueId'),
                name: record.get('queueName')
            })
        );
    }

});

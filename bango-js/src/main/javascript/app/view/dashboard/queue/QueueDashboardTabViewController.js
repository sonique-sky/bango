Ext.define('Spm.view.dashboard.queue.QueueDashboardTabViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.queueDashboard',

    loadStore: function () {
        var store = this.getView().getStore();
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

Ext.define('Spm.view.queue.QueueTabViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.queueTab',

    listen: {
        component: {
            'queueTab': {
                activate: 'onQueueTabActivated',
                close: 'onQueueTabClosed',
                added: 'onQueueTabAdded'
            }
        }
    },

    onQueueTabAdded: function () {
        this.getViewModel().getStore('queuedServiceProblems').load();
    },

    onBeforeLoad: function (store, operation) {
        operation.setParams({queueId: this.queueId()});
    },

    onQueueTabActivated: function () {
        this.fireEvent('queueTabSelected', this.queueId());
    },

    onQueueTabClosed: function () {
        this.fireEvent('queueTabClosed', this.queueId());
    },

    queueId: function () {
        return this.getViewModel().get('queue').get('id');
    },

    onSelectAll: function () {
        this.lookupReference('queueTabGrid').getSelectionModel().selectAll(true);
    },

    onDeselectAll: function () {
        this.lookupReference('queueTabGrid').getSelectionModel().deselectAll(true);
    },

    onBulkTransfer: function () {
        var dialog = this.getView().add({
            xtype: 'bulkTransferDialog'
        });

        dialog.show();
    }
});
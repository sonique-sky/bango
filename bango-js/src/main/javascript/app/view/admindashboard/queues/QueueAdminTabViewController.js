Ext.define('Spm.view.admindashboard.queues.QueueAdminTabViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.queueAdminTab',

    onActivated: function () {
        this.getViewModel().getStore('allQueues').load();
    },

    onQueueStoreLoaded: function (store) {
        this.lookupReference('queueGrid').setSelection(store.first());
    },

    updateQueue: function() {
        var dialog = this.getView().add({
            xtype: 'updateQueueDialog'
        });

        dialog.show();
    },

    createNewQueue: function() {
        var dialog = this.getView().add({
            xtype: 'createQueueDialog'
        });

        dialog.show();
    },

    deleteQueue: function() {
        var dialog = this.getView().add({
            xtype: 'deleteQueueDialog'
        });

        dialog.show();
    }
});
Ext.define('Spm.view.admindashboard.queues.QueueAdminTabViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.queueAdminTab',

    onActivated: function () {
        this.getViewModel().getStore('queues').load();
    },

    onQueueStoreLoaded: function (store) {
        this.lookupReference('queueGrid').setSelection(store.first());
    },

    selectedQueue: function () {
        return this.lookupReference('queueGrid').getSelectionModel().getSelection()[0];
    },

    updateQueue: function () {
        var dialog = this.getView().add({
            xtype: 'updateQueueDialog',
            viewModel: {
                data: {
                    queue: this.selectedQueue()
                }
            }
        });

        dialog.show();
    },

    createNewQueue: function () {
        var dialog = this.getView().add({
            xtype: 'createQueueDialog'
        });

        dialog.show();
    },

    deleteQueue: function () {
        var dialog = this.getView().add({
            xtype: 'deleteQueueDialog'
        });

        dialog.show();
    },

    renderYesNoValue: function (value) {
        return value === true ? 'Yes' : 'No';
    }
});
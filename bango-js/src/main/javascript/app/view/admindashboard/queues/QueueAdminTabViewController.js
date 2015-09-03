Ext.define('Spm.view.admindashboard.queues.QueueAdminTabViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.queueAdminTab',

    onActivated: function () {
        this.getViewModel().getStore('queues').load();
    },

    onQueueStoreLoaded: function (store) {
        this.getView().setSelection(store.first());
    },

    selectedQueue: function () {
        return this.getView().getSelectionModel().getSelection()[0];
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
        var me = this;
        var selectedQueue = this.selectedQueue();
        var queueStore = this.getStore('queues');
        Ext.Msg.show({
            title: 'Delete Queue',
            msg: Ext.String.format('Are you sure you wish to delete queue [{0}]?', selectedQueue.get('name')),
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            callback: function (buttonId) {
                if ('yes' == buttonId) {
                    queueStore.remove(selectedQueue);
                    queueStore.sync({
                        failure: function () {
                            me.loadStore();
                        }
                    });
                }
            }
        });
    },

    renderYesNoValue: function (value) {
        return value === true ? 'Yes' : 'No';
    }
});
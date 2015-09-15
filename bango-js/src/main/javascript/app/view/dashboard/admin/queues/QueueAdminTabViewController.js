Ext.define('Spm.view.dashboard.admin.queues.QueueAdminTabViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.queueAdminTab',

    listen: {
        controller: {
            'createOrUpdateQueueDialog': {
                queueAdded: 'selectFirstRow'
            }
        }
    },

    loadStore: function () {
        var store = this.getView().getStore();
        if (store && !store.isLoaded()) {
            store.load();
        }
    },

    selectFirstRow: function (store) {
        var first = store.first();
        if (first) {
            this.getView().setSelection(first);
        }
    },

    selectedQueue: function () {
        return this.getView().getSelectionModel().getSelection()[0];
    },

    updateQueue: function () {
        this.getView().add({xtype: 'createOrUpdateQueueDialog', title: 'Edit Queue', queue: this.selectedQueue()}).show();
    },

    createNewQueue: function () {
        this.getView().add({xtype: 'createOrUpdateQueueDialog', title: 'Create Queue', queue: Ext.create('Spm.model.Queue')}).show();
    },

    deleteQueue: function () {
        var me = this,
           selectedQueue = me.selectedQueue();

        if (selectedQueue) {
            var queueStore = me.getStore('queues');
            Ext.Msg.show({
                title: 'Delete Queue',
                msg: Ext.String.format('Are you sure you wish to delete queue [{0}]?', selectedQueue.get('name')),
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                callback: function (buttonId) {
                    if ('yes' == buttonId) {
                        queueStore.remove(selectedQueue);
                        queueStore.sync({
                            failure: me.loadStore, scope: me
                        });
                        me.selectFirstRow(queueStore);
                    }
                }
            });
        }
    },

    renderYesNoValue: function (value) {
        return value === true ? 'Yes' : 'No';
    }

});

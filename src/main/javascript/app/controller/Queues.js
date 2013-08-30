Ext.define('Spm.controller.Queues', {
    extend: 'Ext.app.Controller',
    alias: 'controller.queues',

    views: [
        'QueueTabContent',
        'BulkTransferDialog'
    ],

    refs: [
        {
            ref: 'tabPanel',
            selector: '#tab-panel'
        }
    ],
    stores: 'AllQueues',

    constructor: function (config) {
        var me = this;

        me.activeQueueTabs = Ext.create('Ext.util.MixedCollection');

        me.callParent([config]);
    },

    init: function () {
        this.listen({
            controller: {
                '#MyQueues': {
                    queueSelected: this.onQueueSelected
                }
            },
            component: {
                'queueTabToolbar': {
                    bulkTransfer: this.onBulkTransfer,
                    bulkClear: this.onBulkClear
                },
                '#tab-panel': {
                    tabchange: this.onTabChange
                },
                'queueTabContent': {
                    destroy: this.onQueueTabDestroyed,
                    added: this.onQueueTabRendered
                },
                'bulkTransferDialog': {
                    accepted: this.onBulkTransferAccepted
                }
            }
        });
    },

    onBulkTransferAccepted: function (destinationQueue) {
        var me = this;

        var queueTabContent = this.getTabPanel().getActiveTab();
        var selectedServiceProblems = queueTabContent.selectedServiceProblems();
        var serviceProblemIds = [];
        Ext.Array.forEach(selectedServiceProblems, function(item) {
            serviceProblemIds.push(item.get('serviceProblemId'));
        }, me);

        Ext.Ajax.request(
                {
                    url: 'api/queue/bulkTransfer',
                    params: {
                        'originalQueueId': queueTabContent.getQueue().queueId(),
                        'destinationQueueId': destinationQueue.queueId(),
                        'serviceProblemIds': serviceProblemIds
                    },
                    success: function(response) {
                        queueTabContent.getStore().loadRawData(response);
                    }
                }
        );
    },

    onTabChange: function (tabPanel, selectedPanel) {
        if (this.isAQueueTab(selectedPanel)) {
            this.fireEvent('queueTabSelected', selectedPanel);
        } else {
            this.fireEvent('queueTabDeselected');
        }
    },

    onBulkClear: function () {
        console.log('Bulk clear');
    },

    onBulkTransfer: function (queue) {
        var queueId = queue.queueId();
        var store = this.getAllQueuesStore();
        store.load(
                {
                    callback: function (records, operation, success) {
                        if (success) {
                            store.clearFilter();
                            store.filter([
                                {property: 'id', operator: '!=', value: queueId}
                            ]);
                        }
                    }
                }
        );

        Ext.create(this.getBulkTransferDialogView()).show();
    },

    onQueueTabRendered: function (queueTab) {
        queueTab.getStore().load({params: {queueId: queueTab.getQueue().queueId()}})
    },

    onQueueTabDestroyed: function (queueTab) {
        this.activeQueueTabs.removeAtKey(queueTab.getQueue().queueId());
    },

    onQueueSelected: function (queue) {
        var tabPanel = this.getTabPanel();
        var queueTab = this.activeQueueTabs.getByKey(queue.queueId());
        if (!queueTab) {
            queueTab = this.createQueueTabFor(queue);
            this.activeQueueTabs.add(queue.queueId(), queueTab);
            tabPanel.add(queueTab);
        }

        tabPanel.setActiveTab(queueTab);
    },

    createQueueTabFor: function (queue) {
        return Ext.widget('queueTabContent', {queue: queue, store: Ext.create('Spm.store.ServiceProblems')});
    },

    isAQueueTab: function (tab) {
        return tab.isXType('queueTabContent');
    }
});

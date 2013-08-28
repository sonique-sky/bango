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
                'button[id^=bulk-clear]': {
                    click: this.onBulkClear
                },
                'button[id^=bulk-transfer]': {
                    click: this.onBulkTransfer
                },
                '#tab-panel': {
                    tabchange: this.onTabChange
                },
                'queueTabContent': {
                    destroy: this.onQueueTabDestroyed,
                    added: this.onQueueTabRendered
                },
                '#bulk-transfer-view': {
                    select: this.onBulkTransferQueueSelect
                }
            }
        });
    },

    onBulkTransferQueueSelect: function (dataviewmodel, record) {
        console.log(record);
    },

    onTabChange: function (tabPanel, selectedPanel) {
        if (this.isAQueueTab(selectedPanel)) {
            this.fireEvent('queueTabSelected', selectedPanel.down('queueTabContent'));
        } else {
            this.fireEvent('queueTabDeselected');
        }
    },

    onBulkClear: function (bulkClearButton) {
        var selectedServiceProblems = this.selectedServiceProblemsNear(bulkClearButton);
        console.log(selectedServiceProblems);
    },

    onBulkTransfer: function (bulkTransferButton) {
        var queueId = bulkTransferButton.up('queueTabContent').getQueue().queueId();
        var selectedServiceProblems = this.selectedServiceProblemsNear(bulkTransferButton);
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

        Ext.create(this.getBulkTransferDialogView(), {}).show();
    },

    selectedServiceProblemsNear: function (button) {
        var gridPanel = button.up('queueTabContent').down('gridpanel');
        var selectedServiceProblems = gridPanel.getSelectionModel().getSelection();
        return selectedServiceProblems;
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
            queueTab = this.createQueueTabConfigFor(queue);
            this.activeQueueTabs.add(queue.queueId(), queueTab);
            tabPanel.add(queueTab);
        }

        tabPanel.setActiveTab(this.idFor(queue));
    },

    createQueueTabConfigFor: function (queue) {
        return {
            closable: true,
            title: queue.queueName(),
            id: this.idFor(queue),
            iconCls: 'icon-queue',
            items: [
                {
                    store: Ext.create('Spm.store.ServiceProblems'),
                    queue: queue,
                    xtype: 'queueTabContent'
                }
            ]
        };
    },

    idFor: function (queue) {
        return 'queue-tab-' + queue.queueId();
    },

    isAQueueTab: function (tab) {
        return tab.id.indexOf('queue-tab') == 0;
    }
});

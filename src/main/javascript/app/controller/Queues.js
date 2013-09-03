Ext.define('Spm.controller.Queues', {
    extend: 'Ext.app.Controller',
    alias: 'controller.queues',

    views: [
        'QueueTabContent',
        'BulkTransferDialog',
        'BulkClearDialog'
    ],

    refs: [
        {
            ref: 'tabPanel',
            selector: '#tab-panel'
        }
    ],
    stores: 'AllQueues',

    constructor: function (config) {
        this.activeQueueTabs = Ext.create('Ext.util.MixedCollection');

        this.callParent([config]);
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
                    serviceProblemClicked: this.onServiceProblemClicked
                },
                'bulkTransferDialog': {
                    accepted: this.onBulkTransferAccepted
                },
                'bulkClearDialog': {
                    accepted: this.onBulkClearAccepted
                }
            }
        });
    },

    onServiceProblemClicked: function (serviceProblem) {
        this.fireEvent('displayServiceProblem', serviceProblem);
    },

    selectedServiceProblemIds: function (queueTabContent) {
        var selectedServiceProblems = queueTabContent.selectedServiceProblems();
        var serviceProblemIds = [];

        Ext.Array.forEach(selectedServiceProblems, function (item) {
            serviceProblemIds.push(item.get('serviceProblemId'));
        });

        return serviceProblemIds;
    },

    onBulkClearAccepted: function () {
        var queueTabContent = this.getTabPanel().getActiveTab();
        var serviceProblemIds = this.selectedServiceProblemIds(queueTabContent);

        this.performBulkOperation('bulkClear', {
            'originalQueueId': queueTabContent.getQueue().queueId(),
            'serviceProblemIds': serviceProblemIds
        }, queueTabContent);
    },

    onBulkTransferAccepted: function (destinationQueue) {
        var queueTabContent = this.getTabPanel().getActiveTab();
        var serviceProblemIds = this.selectedServiceProblemIds(queueTabContent);

        this.performBulkOperation('bulkTransfer', {
            'originalQueueId': queueTabContent.getQueue().queueId(),
            'destinationQueueId': destinationQueue.queueId(),
            'serviceProblemIds': serviceProblemIds
        }, queueTabContent);
    },

    performBulkOperation: function (operation, params, queueTabContent) {
        Ext.Ajax.request(
                {
                    url: 'api/queue/' + operation,
                    params: params,
                    success: function (response) {
                        queueTabContent.loadWith(response);
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

    hasActiveTroubleReports: function (selectedServiceProblems) {
        var serviceProblemsWithTroubleReports = Ext.Array.filter(selectedServiceProblems, function (serviceProblem) {
            return serviceProblem.get('hasActiveTroubleReport');
        });

        return serviceProblemsWithTroubleReports.length > 0;
    },

    onBulkClear: function (queueTab) {
        var selectedServiceProblems = queueTab.selectedServiceProblems();
        var hasActiveTroubleReports = this.hasActiveTroubleReports(selectedServiceProblems);

        Ext.create(this.getBulkClearDialogView(), {hasActiveTroubleReports: hasActiveTroubleReports}).show();
    },

    onBulkTransfer: function (queueTab) {
        var queueId = queueTab.getQueue().queueId();
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

    onQueueTabDestroyed: function (queueTab) {
        this.activeQueueTabs.removeAtKey(queueTab.getQueue().queueId());
    },

    onQueueSelected: function (queue) {
        var tabPanel = this.getTabPanel();
        var queueTab = this.activeQueueTabs.getByKey(queue.queueId());
        if (!queueTab) {
            queueTab = this.createQueueTabFor(queue);
            this.activeQueueTabs.add(queue.queueId(), queueTab);
            queueTab.load();
            tabPanel.add(queueTab);
        }

        tabPanel.setActiveTab(queueTab);
    },

    createQueueTabFor: function (queue) {
        return Ext.widget('queueTabContent', {queue: queue});
    },

    isAQueueTab: function (tab) {
        return tab.isXType('queueTabContent');
    }
});

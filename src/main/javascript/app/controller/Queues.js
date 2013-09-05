Ext.define('Spm.controller.Queues', {
    extend: 'Ext.app.Controller',
    alias: 'controller.queues',

    mixins: {
        hasRegisteredActions: 'Spm.controller.mixins.HasRegisteredActions'
    },

    requires: [
        'Spm.controller.action.queue.BulkClearAction',
        'Spm.controller.action.queue.BulkTransferAction',
        'Spm.proxy.ServiceProblemProxy'
    ],

    views: [
        'queue.QueueTabContent'
    ],

    refs: [
        {
            ref: 'tabPanel',
            selector: '#tab-panel'
        }
    ],

    stores: [
        'AllQueues'
    ],

    constructor: function (config) {
        this.mixins.hasRegisteredActions.constructor.call(this, config);
        this.registerAction(Ext.create('Spm.controller.action.queue.BulkClearAction'));
        this.registerAction(Ext.create('Spm.controller.action.queue.BulkTransferAction'));

        this.proxy = Spm.proxy.ServiceProblemProxy.serviceProblemLookupProxy();
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
                    startAction: this.onStartAction
                },
                '#tab-panel': {
                    tabchange: this.onTabChange
                },
                'queueTabContent': {
                    destroy: this.onQueueTabDestroyed,
                    serviceProblemClicked: this.onServiceProblemClicked
                },
                'bulkTransferDialog': {
                    accepted: this.onFinishAction
                },
                'bulkClearDialog': {
                    accepted: this.onFinishAction
                }
            }
        });
    },

    onServiceProblemClicked: function (serviceProblem) {
        var operation = Ext.create('Ext.data.Operation', {
            action: 'read',
            params: {serviceProblemId: serviceProblem.get('serviceProblemId')}
        });

        this.proxy.read(operation, function (operation) {
            if (operation.wasSuccessful()) {
                this.fireEvent('displayServiceProblem', operation.getRecords()[0]);
            }
        }, this);
    },

    selectedServiceProblemIds: function (queueTabContent) {
        var selectedServiceProblems = queueTabContent.selectedServiceProblems();
        var serviceProblemIds = [];

        Ext.Array.forEach(selectedServiceProblems, function (item) {
            serviceProblemIds.push(item.get('serviceProblemId'));
        });

        return serviceProblemIds;
    },

    onTabChange: function (tabPanel, selectedPanel) {
        if (this.isAQueueTab(selectedPanel)) {
            this.fireEvent('queueTabSelected', selectedPanel);
        } else {
            this.fireEvent('queueTabDeselected');
        }
    },

    onStartAction: function (actionName) {
        this.registeredActionWithName(actionName).applyStartStep(arguments);
    },

    onFinishAction: function (actionName) {
        this.registeredActionWithName(actionName).applyFinishStep(arguments);
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
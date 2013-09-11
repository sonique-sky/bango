Ext.define('Spm.controller.Queues', {
    extend: 'Ext.app.Controller',
    alias: 'controller.queues',

    mixins: {
        hasRegisteredActions: 'Spm.controller.mixins.HasRegisteredActions',
        serviceProblemClickHandler: 'Spm.controller.mixins.ServiceProblemClickHandler'
    },

    requires: [
        'Spm.controller.action.queue.BulkClearAction',
        'Spm.controller.action.queue.BulkTransferAction'
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
        this.mixins.hasRegisteredActions.constructor.call(this, {
            registeredActions: [
                'Spm.controller.action.queue.BulkClearAction',
                'Spm.controller.action.queue.BulkTransferAction'
            ]
        });
        this.mixins.serviceProblemClickHandler.constructor.call(this, config);

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
                '#tab-panel': {
                    tabchange: this.onTabChange
                },
                'queueTabContent': {
                    startAction: this.onStartAction,
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
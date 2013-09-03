Ext.define('Spm.controller.Queues', {
    extend: 'Ext.app.Controller',
    alias: 'controller.queues',

    requires: [
        'Spm.controller.action.queue.BulkClearAction',
        'Spm.controller.action.queue.BulkTransferAction'
    ],

    views: [
        'QueueTabContent'
    ],

    refs: [
        {
            ref: 'tabPanel',
            selector: '#tab-panel'
        }
    ],

    constructor: function (config) {
        this.registeredActions = Ext.create('Ext.util.MixedCollection');
        this.registeredActions.add('bulkClear', Ext.create('Spm.controller.action.queue.BulkClearAction'));
        this.registeredActions.add('bulkTransfer', Ext.create('Spm.controller.action.queue.BulkTransferAction'));

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

    onTabChange: function (tabPanel, selectedPanel) {
        if (this.isAQueueTab(selectedPanel)) {
            this.fireEvent('queueTabSelected', selectedPanel);
        } else {
            this.fireEvent('queueTabDeselected');
        }
    },

    onStartAction : function(actionName, context) {
        var action = this.registeredActions.getByKey(actionName);

        action.startAction.apply(action, Array.prototype.slice.call(arguments, 1));
    },

    onFinishAction : function(actionName, context) {
        var action = this.registeredActions.getByKey(actionName);

        action.finishAction.apply(action, Array.prototype.slice.call(arguments, 1));
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
Ext.define('Spm.controller.Queues', {
    extend: 'Ext.app.Controller',
    alias: 'controller.queues',

    mixins: {
        hasRegisteredActions: 'Spm.controller.mixins.HasRegisteredActions',
        serviceProblemClickHandler: 'Spm.controller.mixins.ServiceProblemClickHandler'
    },

    requires: [
        'Spm.controller.action.queue.BulkClearAction',
        'Spm.controller.action.queue.BulkTransferAction',
        'Spm.view.queue.ActionToolbar',
        'Spm.view.queue.QueueTabContent'
    ],

    refs: [
        { ref: 'tabPanel', selector: '#tab-panel' }
    ],

    stores: [
        'AllQueues',
        'AuthenticatedAgent'
    ],

    constructor: function (config) {
        this.mixins.serviceProblemClickHandler.constructor.call(this, config);

        this.activeQueueTabs = Ext.create('Ext.util.MixedCollection');

        this.callParent(arguments);
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
                    finishAction: this.onFinishAction,
                    destroy: this.onQueueTabDestroyed,
                    serviceProblemClicked: this.onServiceProblemClicked,
                    gridSelectionChanged: this.updateActionStates
                }
            }
        });
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

        this.updateActionStates(queueTab);
        tabPanel.setActiveTab(queueTab);
    },

    createQueueTabFor: function (queue) {
        var actionNameToActionMap = this.registerActionsFor(queue.queueId(), [
            'Spm.controller.action.queue.BulkClearAction',
            'Spm.controller.action.queue.BulkTransferAction'
        ]);

        return Ext.widget('queueTabContent', {registeredActions: actionNameToActionMap, queue: queue});
    },

    isAQueueTab: function (tab) {
        return tab.isXType('queueTabContent');
    },

    updateActionStates: function (queueTab) {
        this.updateActionState(queueTab, this.getAuthenticatedAgentStore().authenticatedAgent());
    }
});
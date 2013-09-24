Ext.define('Spm.controller.ServiceProblems', {
    extend: 'Ext.app.Controller',
    alias: 'controller.serviceProblems',
    requires: [
        'Spm.view.serviceproblem.ServiceProblemTabContent',
        'Spm.view.component.Notification'
    ],

    mixins: [
        'Spm.controller.mixins.ActionContextManager'
    ],

    refs: [
        { ref: 'tabPanel', selector: '#tab-panel' }
    ],

    constructor: function (config) {
        this.activeServiceProblemTabs = Ext.create('Ext.util.MixedCollection');

        this.callParent(arguments);
    },

    init: function () {
        this.listen({
            controller: {
                '#Queues': {
                    displayServiceProblem: this.displayServiceProblem
                },
                '#Searches': {
                    displayServiceProblem: this.displayServiceProblem
                },
                '#MyItems': {
                    displayServiceProblem: this.displayServiceProblem
                },
                '#Security': {
                    loggedOut: this.onLoggedOut
                }
            },

            component: {
                'serviceProblemTabContent': {
                    destroy: this.onServiceProblemTabDestroyed,
                    finishAction: this.onFinishAction,
                    serviceProblemPulled: this.onServiceProblemPulled,
                    workItemHeld: this.onWorkItemHeld,
                    workItemReleased: this.onWorkItemReleased
                }
            }
        });
    },

    displayServiceProblem: function (serviceProblem) {
        var tabPanel = this.getTabPanel();
        var serviceProblemId = serviceProblem.serviceProblemId();
        var serviceProblemTab = this.activeServiceProblemTabs.getByKey(serviceProblemId);
        if (!serviceProblemTab) {
            serviceProblemTab = this.createServiceProblemTabFor(serviceProblem);
            this.activeServiceProblemTabs.add(serviceProblemId, serviceProblemTab);
            tabPanel.add(serviceProblemTab);
        }

        serviceProblemTab.load(serviceProblem);
        this.updateActionStates(serviceProblemTab);
        tabPanel.setActiveTab(serviceProblemTab);
    },

    createServiceProblemTabFor: function (serviceProblem) {
        return Ext.widget('serviceProblemTabContent', {actionContextManager: this, serviceProblem: serviceProblem});
    },

    onServiceProblemTabDestroyed: function (serviceProblemTab) {
        this.activeServiceProblemTabs.removeAtKey(serviceProblemTab.getServiceProblem().serviceProblemId());
        this.deregisterActionsFor(serviceProblemTab);
    },

    onServiceProblemPulled: function (serviceProblemTab) {
        var serviceProblemId = serviceProblemTab.getServiceProblem().serviceProblemId();

        this.updateActionStates(serviceProblemTab);

        Spm.component.Notification.info('Service Problem Assigned', 'Service Problem [{0}] has been assigned to you.', serviceProblemId);

        this.fireEvent('serviceProblemPulled');
    },

    onWorkItemHeld: function (serviceProblemTab) {
        this.updateActionStates(serviceProblemTab);
        this.fireEvent('workItemHeld');
    },

    onWorkItemReleased: function (serviceProblemTab) {
        this.updateActionStates(serviceProblemTab);
        this.fireEvent('workItemReleased');
    },

    onLoggedOut: function () {
        var tabPanel = this.getTabPanel();
        this.activeServiceProblemTabs.each(function (item) {
            tabPanel.remove(item);
        });
    }
});
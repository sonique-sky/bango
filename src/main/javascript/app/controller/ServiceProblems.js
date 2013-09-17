Ext.define('Spm.controller.ServiceProblems', {
    extend: 'Ext.app.Controller',
    alias: 'controller.serviceProblems',
    requires: [
        'Spm.controller.action.serviceproblem.AddNoteAction',
        'Spm.controller.action.serviceproblem.RefreshAction',
        'Spm.controller.action.serviceproblem.RefreshEventHistoryAction',
        'Spm.controller.action.serviceproblem.PullServiceProblemAction',
        'Spm.controller.action.serviceproblem.HoldWorkItemAction',
        'Spm.controller.action.serviceproblem.UnholdWorkItemAction'
    ],

    mixins: {
        hasRegisteredActions: 'Spm.controller.mixins.HasRegisteredActions'
    },

    views: [
        'serviceproblem.ServiceProblemTabContent'
    ],

    refs: [
        {
            ref: 'tabPanel',
            selector: '#tab-panel'
        }
    ],

    constructor: function (config) {
        this.mixins.hasRegisteredActions.constructor.call(this, {
            registeredActions: [
                'Spm.action.AddNoteAction',
                'Spm.action.RefreshAction',
                'Spm.action.RefreshEventHistoryAction',
                'Spm.action.PullServiceProblemAction',
                'Spm.action.HoldWorkItemAction',
                'Spm.action.UnholdWorkItemAction'
            ]
        });

        this.activeServiceProblemTabs = Ext.create('Ext.util.MixedCollection');

        this.callParent([config]);
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
                }
            },

            component: {
                'serviceProblemTabContent': {
                    destroy: this.onServiceProblemTabDestroyed,
                    finishAction: this.onFinishAction,
                    serviceProblemPulled: this.onServiceProblemPulled,
                    workItemHeld: this.onWorkItemHeld,
                    workItemUnheld: this.onWorkItemUnheld
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
        tabPanel.setActiveTab(serviceProblemTab);
    },

    createServiceProblemTabFor: function (serviceProblem) {
        return Ext.widget('serviceProblemTabContent', {hasRegisteredActions: this, serviceProblem: serviceProblem});
    },

    onServiceProblemTabDestroyed: function (serviceProblemTab) {
        this.activeServiceProblemTabs.removeAtKey(serviceProblemTab.getServiceProblem().serviceProblemId());
    },

    onServiceProblemPulled: function () {
        this.registeredActionWithName('pull').setDisabled(true);
        this.registeredActionWithName('hold').setDisabled(false)

        this.fireEvent('serviceProblemPulled');
    },

    onWorkItemHeld: function () {
        this.registeredActionWithName('hold').setHidden(true)
        this.registeredActionWithName('unhold').setHidden(false)
        this.fireEvent('workItemHeld');
    },

    onWorkItemUnheld: function () {
        this.registeredActionWithName('unhold').setHidden(true)
        this.registeredActionWithName('hold').setHidden(false)
        this.fireEvent('workItemUnheld');
    }
});
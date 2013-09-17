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
                    startAction: this.onStartAction,
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
        return Ext.widget('serviceProblemTabContent', {serviceProblem: serviceProblem});
    },

    onServiceProblemTabDestroyed: function (serviceProblemTab) {
        this.activeServiceProblemTabs.removeAtKey(serviceProblemTab.getServiceProblem().serviceProblemId());
    },

    onServiceProblemPulled: function (serviceProblemTab) {
//        this.getPullAction().setDisabled();
        serviceProblemTab.down('#' + Spm.action.HoldWorkItemAction.ACTION_NAME).setDisabled(false);
        this.fireEvent('serviceProblemPulled');
    },

    onWorkItemHeld: function (serviceProblemTab) {
        serviceProblemTab.actionToolbar().showUnhold();
        this.fireEvent('workItemHeld');
    },

    onWorkItemUnheld: function (serviceProblemTab) {
        serviceProblemTab.actionToolbar().showHold();
        this.fireEvent('workItemUnheld');
    }
});
Ext.define('Spm.controller.ServiceProblems', {
    extend: 'Ext.app.Controller',
    alias: 'controller.serviceProblems',
    requires: [
        'Spm.controller.action.serviceproblem.AddNoteAction',
        'Spm.controller.action.serviceproblem.RefreshAction',
        'Spm.controller.action.serviceproblem.RefreshEventHistoryAction',
        'Spm.controller.action.serviceproblem.PullServiceProblemAction',
        'Spm.controller.action.serviceproblem.HoldAndReleaseWorkItemAction'
    ],

    mixins: [
        'Spm.controller.mixins.HasRegisteredActions'
    ],

    stores: [
        'AuthenticatedAgent'
    ],

    refs: [
        {
            ref: 'tabPanel',
            selector: '#tab-panel'
        }
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
        this.updateActionState(serviceProblemTab, this.getAuthenticatedAgentStore().authenticatedAgent());
        tabPanel.setActiveTab(serviceProblemTab);
    },

    createServiceProblemTabFor: function (serviceProblem) {
        var actionNameToActionMap = this.registerActionsFor(serviceProblem.serviceProblemId(), [
            'Spm.action.AddNoteAction',
            'Spm.action.RefreshAction',
            'Spm.action.RefreshEventHistoryAction',
            'Spm.action.PullServiceProblemAction',
            'Spm.action.HoldAndReleaseWorkItemAction'
        ]);

        return Ext.widget('serviceProblemTabContent', {registeredActions: actionNameToActionMap, serviceProblem: serviceProblem});
    },

    onServiceProblemTabDestroyed: function (serviceProblemTab) {
        var serviceProblemId = serviceProblemTab.getServiceProblem().serviceProblemId();
        this.activeServiceProblemTabs.removeAtKey(serviceProblemId);
        this.deregisterActionsFor(serviceProblemId);
    },

    onServiceProblemPulled: function (serviceProblemTab) {
        this.updateActionState(serviceProblemTab, this.getAuthenticatedAgentStore().authenticatedAgent());

        this.fireEvent('serviceProblemPulled');
    },

    onWorkItemHeld: function (serviceProblemTab) {
        this.updateActionState(serviceProblemTab, this.getAuthenticatedAgentStore().authenticatedAgent());

        this.fireEvent('workItemHeld');
    },

    onWorkItemReleased: function (serviceProblemTab) {
        this.updateActionState(serviceProblemTab, this.getAuthenticatedAgentStore().authenticatedAgent());

        this.fireEvent('workItemReleased');
    }
});
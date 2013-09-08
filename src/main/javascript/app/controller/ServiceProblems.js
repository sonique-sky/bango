Ext.define('Spm.controller.ServiceProblems', {
    extend: 'Ext.app.Controller',
    alias: 'controller.serviceProblems',
    requires:['Spm.controller.action.serviceproblem.AddNoteAction'],

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
        this.mixins.hasRegisteredActions.constructor.call(this, config);
        this.registerAction(Ext.create('Spm.controller.action.serviceproblem.AddNoteAction'));

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
                }
            },
            component: {
                'serviceProblemTabContent': {
                    destroy: this.onServiceProblemTabDestroyed
                },
                'eventHistoryActionToolbar' : {
                    startAction: this.onStartAction
                },
                'addNoteDialog': {
                    accepted: this.onFinishAction
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
    }

});
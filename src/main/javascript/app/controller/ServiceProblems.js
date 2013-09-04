Ext.define('Spm.controller.ServiceProblems', {
    extend: 'Ext.app.Controller',
    alias: 'controller.serviceProblems',

    views: [
        'ServiceProblemTabContent'
    ],

    refs: [
        {
            ref: 'tabPanel',
            selector: '#tab-panel'
        }
    ],

    constructor: function (config) {
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
                }
            }
        });
    },

    displayServiceProblem: function (serviceProblem) {
        var tabPanel = this.getTabPanel();
        var serviceProblemId = serviceProblem.serviceProblemId();
        var serviceProblemTab = this.activeServiceProblemTabs.getByKey(serviceProblemId);
        if (!serviceProblemTab) {
            serviceProblemTab = this.createServiceProblemTabFor(serviceProblemId);
            this.activeServiceProblemTabs.add(serviceProblemId, serviceProblemTab);
            tabPanel.add(serviceProblemTab);
        }

        tabPanel.setActiveTab(serviceProblemTab);
    },

    createServiceProblemTabFor: function (serviceProblemId) {
        return Ext.widget('serviceProblemTabContent', {serviceProblemId: serviceProblemId});
    },

    onServiceProblemTabDestroyed: function (serviceProblemTab) {
        this.activeServiceProblemTabs.removeAtKey(serviceProblemTab.getServiceProblemId());
    }

});
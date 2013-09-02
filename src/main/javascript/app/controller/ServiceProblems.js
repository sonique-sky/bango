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
        var me = this;

        me.activeServiceProblemTabs = Ext.create('Ext.util.MixedCollection');

        me.callParent([config]);
    },

    init: function () {
        this.listen({
            controller: {
                '#Queues': {
                    displayServiceProblem: this.displayServiceProblem
                },
                '#Search': {
                    displayServiceProblem: this.displayServiceProblem
                }
            }
        });
    },

    displayServiceProblem: function (serviceProblemId) {
        var tabPanel = this.getTabPanel();
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
    }

});
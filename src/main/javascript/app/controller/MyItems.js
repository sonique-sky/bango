Ext.define('Spm.controller.MyItems', {
    extend: 'Ext.app.Controller',
    alias: 'controller.myItems',
    requires: [
        'Spm.controller.Security'
    ],
    mixins: {
        serviceProblemClickHandler: 'Spm.controller.mixins.ServiceProblemClickHandler'
    },
    views: [
        'application.MyItemsTabContent'
    ],
    refs: [
        {
            ref: 'tabPanel',
            selector: '#tab-panel'
        },
        {
            ref: 'myItemsTabContent',
            selector: 'myItemsTabContent',
            xtype: 'myItemsTabContent'
        }
    ],
    constructor: function (config) {
        this.mixins.serviceProblemClickHandler.constructor.call(this, config);

        this.callParent([config]);
    },

    init: function () {
        this.listen({
            controller: {
                '#ServiceProblems': {
                    'serviceProblemPulled': this.displayMyItems,
                    'workItemHeld': this.onWorkItemHeld
                },
                '#Security': {
                    'authenticated': this.displayMyItems
                }
            },
            component: {
                'myItemsTabContent': {
                    serviceProblemClicked: this.onServiceProblemClicked
                }
            }
        });
    },

    displayMyItems: function () {
        this.getMyItemsTabContent().loadMyItems();
    },

    onWorkItemHeld: function () {
        this.getTabPanel().setActiveTab(this.getMyItemsTabContent());
    }

});
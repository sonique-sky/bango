Ext.define('Spm.controller.MyItems', {
    extend: 'Ext.app.Controller',
    alias: 'controller.myItems',
    requires: [
        'Spm.controller.Security'
    ],
    mixins: {
        serviceProblemClickHandler: 'Spm.controller.mixins.ServiceProblemClickHandler'
    },
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
                    'serviceProblemPulled': this.reloadMyItems,
                    'workItemReleased' : this.reloadMyItems,
                    'workItemHeld': this.onWorkItemHeld
                },
                '#Security': {
                    'authenticated': this.reloadMyItems
                }
            },
            component: {
                'myItemsTabContent': {
                    serviceProblemClicked: this.onServiceProblemClicked
                }
            }
        });
    },

    reloadMyItems: function () {
        this.getMyItemsTabContent().loadMyItems();
    },

    onWorkItemHeld: function () {
        this.reloadMyItems();
        this.getTabPanel().setActiveTab(this.getMyItemsTabContent());
    }
});
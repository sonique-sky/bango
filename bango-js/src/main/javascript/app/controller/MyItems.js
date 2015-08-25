Ext.define('Spm.controller.MyItems', {
    extend: 'Ext.app.Controller',
    alias: 'controller.myItems',
    requires: [
        'Spm.controller.Security',
        'Spm.view.myitems.MyItemsTab'
    ],
    mixins: {
        serviceProblemClickHandler: 'Spm.controller.mixins.ServiceProblemClickHandler'
    },
    refs: [
        {
            ref: 'tabPanel',
            selector: '#tab-panel'
        }
    ],
    myItemsTab: undefined,

    constructor: function (config) {
        this.mixins.serviceProblemClickHandler.constructor.call(this, config);
        this.myItemsStore = Spm.store.ServiceProblems.myItemsServiceProblemStore();
        this.callParent([config]);
    },

    init: function () {
        this.listen({
            controller: {
                '#ServiceProblems': {
                    'serviceProblemPulled': this.reloadMyItems,
                    'workItemReleased': this.reloadMyItems,
                    'workItemHeld': this.onWorkItemHeld
                },
                '#Security': {
                    'authenticated': this.onAuthenticated,
                    'loggedOut': this.onLoggedOut
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
        this.myItemsStore.load();
    },

    onAuthenticated: function () {
        this.myItemsTab = Ext.widget('myItemsTabContent', {store: this.myItemsStore});
        var tabPanel = this.getTabPanel();
        tabPanel.insert(0, this.myItemsTab);
        this.reloadMyItems();
    },

    onLoggedOut: function () {
        var tabPanel = this.getTabPanel();
        tabPanel.remove(this.myItemsTab);
        this.myItemsTab = undefined;
    },

    onWorkItemHeld: function () {
        this.reloadMyItems();
        this.getTabPanel().setActiveTab(this.myItemsTab);
    }
});
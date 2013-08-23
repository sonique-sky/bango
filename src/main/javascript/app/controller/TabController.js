Ext.define('Spm.controller.TabController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.tabController',

    mixins: [
        'Spm.mixin.TabHeaderId'
    ],
    requires: [
        'Spm.mixin.TabHeaderId',
        'Spm.view.QueueContainer'
    ],

    views: [
        'TabPanel'
    ],

    refs: [
        {
            ref: 'tabPanel',
            selector: '#tab-panel'
        }
    ],

    onQueueSelected: function(queue) {
        var tabPanel = this.getTabPanel();

        var queueController = Ext.create('Spm.controller.QueueController', {queue: queue});

        tabPanel.add(queueController.tabView());
    },

    init: function(application) {
        application.on({
            queueSelected: {
                fn: this.onQueueSelected,
                scope: this
            }
        });
    }

});

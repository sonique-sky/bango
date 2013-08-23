Ext.define('Spm.controller.QueueTab', {

    extend: 'Ext.app.Controller',
    alias: 'controller.queueTab',

    mixins: [
        'Spm.mixin.TabHeaderId'
    ],

    requires: [
        'Spm.mixin.TabHeaderId'
    ],

    views: [
        'QueueTabContent'
    ],

    refs: [
        {
            ref: 'tabPanel',
            selector: '#tab-panel'
        }
    ],

    constructor: function (config) {
        var me = this;

        me.activeQueueTabs = new Ext.util.MixedCollection();

        me.callParent(config);
    },

    onQueueSelected: function (queue) {
        var tabPanel = this.getTabPanel();

        var queueTab = this.activeQueueTabs.getByKey(queue.queueId());
        if (!queueTab) {
            queueTab = this.createQueueTabConfigFor(queue);
            this.activeQueueTabs.add(queue.queueId(), queueTab);
            tabPanel.add(queueTab);
        }

        tabPanel.setActiveTab(this.idFor(queue));
    },

    init: function (application) {
        application.on({
            queueSelected: {
                fn: this.onQueueSelected,
                scope: this
            }
        });
    },

    createQueueTabConfigFor: function (queue) {
        return {
            closable: true,
            title: queue.queueName(),
            id: this.idFor(queue),
            items: {
                queue: queue,
                xtype: 'queueTabContent'
            }
        };
    },

//    init: function (application) {
//        var selector = 'a#foo-' + this.getQueue().get('id');
//        console.log(selector);
//        this.control({
//            selector: {
//                click: this.onButtonClick
//            }
//        });
//    },

    idFor: function (queue) {
        return 'queue-tab-' + queue.queueId();
    },

    onButtonClick: function (button, e, eOpts) {
        console.log(button);
    }

});

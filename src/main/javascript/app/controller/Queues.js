Ext.define('Spm.controller.Queues', {
    extend: 'Ext.app.Controller',
    alias: 'controller.queues',

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

        me.callParent([config]);
    },

    init: function (application) {
        application.on({
            queueSelected: {
                fn: this.onQueueSelected,
                scope: this
            }
        });

        this.listen({
            component: {
                "button[id^=bulk-clear]": {
                    click: this.onBulkClear
                }
            }
        });
    },

    onBulkClear: function (bulkClearButton) {
        console.log(bulkClearButton.up('queueTabContent').getQueue());
    },

    onQueueTabDestroyed: function (queueTab) {
        this.activeQueueTabs.removeAtKey(queueTab.getQueue().queueId());
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

    createQueueTabConfigFor: function (queue) {
        var me = this;
        return {
            closable: true,
            title: queue.queueName(),
            id: this.idFor(queue),
            items: [
                {
                    queue: queue,
                    xtype: 'queueTabContent',
                    listeners: {
                        destroy: {
                            fn: me.onQueueTabDestroyed,
                            scope: me
                        }
                    }
                }
            ]
        };
    },

    idFor: function (queue) {
        return 'queue-tab-' + queue.queueId();
    }
});

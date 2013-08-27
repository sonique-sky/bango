Ext.define('Spm.controller.Queues', {
    extend: 'Ext.app.Controller',
    alias: 'controller.queues',

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

        me.activeQueueTabs = Ext.create('Ext.util.MixedCollection');

        me.callParent([config]);
    },

    init: function () {
        this.listen({
            controller: {
                '#MyQueues' : {
                    queueSelected: this.onQueueSelected
                }
            },
            component: {
                'button[id^=bulk-clear]': {
                    click: this.onBulkClear
                },
                '#tab-panel': {
                    tabchange: this.onTabChange
                },
                'queueTabContent': {
                    destroy: this.onQueueTabDestroyed
                }
            }
        });
    },

    onTabChange: function(tabPanel, selectedPanel) {
        if(this.isAQueueTab(selectedPanel)) {
            this.fireEvent('queueTabSelected', selectedPanel.down('queueTabContent'));
        } else {
            this.fireEvent('queueTabDeselected');
        }
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
        return {
            closable: true,
            title: queue.queueName(),
            id: this.idFor(queue),
            iconCls: 'icon-queue',
            items: [
                {
                    queue: queue,
                    xtype: 'queueTabContent'
                }
            ]
        };
    },

    idFor: function (queue) {
        return 'queue-tab-' + queue.queueId();
    },

    isAQueueTab: function(tab) {
        return tab.id.indexOf('queue-tab') == 0;
    }
});

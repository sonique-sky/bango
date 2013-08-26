Ext.define('Spm.view.QueueTabContent', {
    extend: 'Ext.container.Container',
    alias: 'widget.queueTabContent',

    height: 505,
    width: 536,

    config: {
        queue: undefined
    },

    initComponent: function () {
        var me = this;

        var queue = me.queue;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'toolbar',
                    items: [
                        {
                            xtype: 'button',
                            id: 'bulk-clear-' + queue.queueId(),
                            text: 'Bulk Clear'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});
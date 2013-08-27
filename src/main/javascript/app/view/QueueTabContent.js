Ext.define('Spm.view.QueueTabContent', {
    extend: 'Ext.container.Container',
    alias: 'widget.queueTabContent',

    config: {
        queue: undefined
    },

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'toolbar',
                    items: [
                        {
                            xtype: 'button',
                            id: 'bulk-clear-' + me.queue.queueId(),
                            text: 'Bulk Clear'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});
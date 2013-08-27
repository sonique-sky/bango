Ext.define('Spm.view.QueueTabContent', {
    extend: 'Ext.container.Container',
    alias: 'widget.queueTabContent',

    config: {
        queue: undefined,
        store: undefined
    },

    height: 700,
    width: 700,
    layout: 'border',

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'toolbar',
                    region: 'north',
                    items: [
                        {
                            xtype: 'button',
                            id: 'bulk-clear-' + me.queue.queueId(),
                            text: 'Bulk Clear'
                        }
                    ]
                }
                ,
                {
                    xtype: 'gridpanel',
                    region: 'center',
                    store: me.store,
                    columns: [
                        {text: 'Service Problem Id', dataIndex: 'serviceProblemId'},
                        {text: 'Status', dataIndex: 'status'},
                        {text: 'Work Item Status', dataIndex: 'workItem.status', renderer: this.rendy}
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    rendy: function (value, metaData, record, rowIndex, colIndex, store, view) {
        console.log(store);
        var first = store.first();
        console.log(first);
        console.log(first.workItem());
    }
});
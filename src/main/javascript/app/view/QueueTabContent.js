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
                        {text: 'Work Item Status', dataIndex: 'workItem.status', renderer: this.nestedPropertyRenderer}
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    nestedPropertyRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        function evaluateMe(dataIndex, associatedData) {
            var properties = dataIndex.split('.');
            var value = associatedData;

            Ext.Array.forEach(properties, function(property) {
                value = value[property]
            });

            return value;
        }

        var gridPanel = view.up('gridpanel');
        var column = gridPanel.columns[colIndex];

        return evaluateMe(column.dataIndex, record.getAssociatedData());
    }
});
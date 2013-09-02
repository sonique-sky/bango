Ext.define('Spm.view.SearchResultTabContent', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.searchResultTabContent',

    config: {
        store: undefined,
        searchCriteria: undefined
    },

    border: 0,

    closable: true,
    iconCls: 'icon-search',

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            title: 'Search Results',
            id: 'search-result-tab',
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    flex: 1.0,
                    store: me.store
                },
            ],
            items: [
                {
                    xtype: 'gridpanel',
                    store: me.store,
                    border: 0,
                    listeners: {
                        cellclick: {fn: me.onCellClicked, scope: me}
                    },
                    columns: [
                        {text: 'Service Problem',
                            columns: [
                                {text: 'Service Problem Id', dataIndex: 'serviceProblemId'},
                                {text: 'Status', dataIndex: 'status'}
                            ]
                        },
                        {text: 'Work Item',
                            columns: [
                                {text: 'Work Item Status', dataIndex: 'workItem.status', renderer: this.nestedPropertyRenderer}
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onCellClicked: function (view, td, cellIndex, record) {
        this.fireEvent("serviceProblemClicked", record);
    },

    nestedPropertyRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        function evaluateMe(dataIndex, associatedData) {
            var properties = dataIndex.split('.');
            var value = associatedData;

            Ext.Array.forEach(properties, function (property) {
                value = value[property]
            });

            return value;
        }

        var gridPanel = view.up('gridpanel');
        // Hack cos Ext offsets the colIndex value if selType property is 'checkboxmodel'
        if (gridPanel.selModel.selType == 'checkboxmodel') {
            colIndex--;
        }
        // End Hack
        var column = gridPanel.columns[colIndex];

        return evaluateMe(column.dataIndex, record.getAssociatedData());
    }
});
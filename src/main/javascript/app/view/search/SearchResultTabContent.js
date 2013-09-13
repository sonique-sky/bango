Ext.define('Spm.view.search.SearchResultTabContent', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.searchResultTabContent',

    requires: [
        'Spm.view.renderer.NestedPropertyRenderer'
    ],

    config: {
        searchCriteria: undefined
    },

    border: 0,

    closable: true,
    iconCls: 'icon-search',

    initComponent: function () {
        this.store = Spm.store.ServiceProblems.serviceProblemSearchStore();

        Ext.applyIf(this, {
            title: 'Search Results',
            id: 'search-result-tab',
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    flex: 1.0,
                    store: this.store
                }
            ],
            items: [
                {
                    xtype: 'gridpanel',
                    store: this.store,
                    border: 0,
                    listeners: {
                        cellclick: {fn: this.onCellClicked, scope: this}
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
                                {text: 'Work Item Status', dataIndex: 'workItem.status', renderer: Spm.view.renderer.NestedPropertyRenderer.renderer}
                            ]
                        }
                    ]
                }
            ]
        });

        this.callParent(arguments);
    },

    onCellClicked: function (view, td, cellIndex, record) {
        this.fireEvent("serviceProblemClicked", record);
    },

    loadWith: function(serviceProblems) {
        this.store.loadRecords(serviceProblems);
    },

    reloadAndMakeActive: function() {
        debugger;
        this.up('tabpanel').setActiveTab(this);

        this.store.load({params: this.getSearchCriteria()});
    }
});
Ext.define('Spm.view.search.SearchResultTab', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.searchResultTab',

    border: 0,

    closable: true,
    iconCls: 'icon-search',

    controller: 'searchResultTab',
    viewModel: {type: 'searchResultTab'},

    listeners: {
        added: 'onTabAdded',
        close: 'onTabClosed'
    },

    title: 'Search Results',

    dockedItems: [
        {
            xtype: 'pagingtoolbar',
            flex: 1.0,
            bind: {
                store: '{serviceProblems}'
            }
        }
    ],
    items: [
        {
            xtype: 'gridpanel',
            bind: {
                store: '{serviceProblems}'
            },
            border: 0,
            //listeners: {
            //cellclick: {fn: this.onCellClicked, scope: this}
            //},
            columns: [
                {
                    text: 'Service Problem',
                    columns: [
                        {text: 'Service Problem Id', dataIndex: 'serviceProblemId'},
                        {text: 'Status', dataIndex: 'status'}
                    ]
                },
                {
                    text: 'Work Item',
                    columns: [
                        {
                            xtype: 'templatecolumn',
                            tpl: '{workItem.status}',
                            text: 'Work Item Status'
                        },
                        {
                            xtype: 'templatecolumn',
                            tpl: '{workItem.agent.displayName}',
                            text: 'Agent'
                        }
                    ]
                }
            ]
        }
    ],

    //initComponent: function () {
    //    this.store = Spm.store.ServiceProblems.serviceProblemSearchStore();
    //    this.store.addManagedListener(this.store, 'beforeLoad', this.onBeforeLoad, this);
    //
    //    Ext.applyIf(this, {
    //    });
    //
    //    this.callParent(arguments);
    //},

    onBeforeLoad: function (store, operation) {
        Ext.apply(operation, {params: this.searchCriteria});
    },

    onCellClicked: function (view, td, cellIndex, record) {
        this.fireEvent("serviceProblemClicked", record);
    },

    loadWith: function (serviceProblems) {
        this.store.loadRecords(serviceProblems);
    },

    reloadAndMakeActive: function () {
        this.up('tabpanel').setActiveTab(this);

        var searchCriteria = Ext.apply({}, this.searchCriteria);

        this.store.load({params: searchCriteria});
    }
});
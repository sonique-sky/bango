Ext.define('Spm.view.search.SearchResultTab', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.searchResult',

    controller: 'searchResult',
    viewModel: {type: 'searchResult'},

    listeners: {
        added: 'onTabAdded',
        close: 'onTabClosed',
        cellclick: 'onCellClicked'
    },

    bind: {
        store: '{serviceProblems}'
    },

    border: 0,
    closable: true,
    iconCls: 'icon-search',
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
});

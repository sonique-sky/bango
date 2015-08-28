Ext.define('Spm.view.search.SearchResultTab', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.searchResult',

    border: 0,

    closable: true,
    iconCls: 'icon-search',

    controller: 'searchResult',
    viewModel: {type: 'searchResult'},

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
            listeners: {
                cellclick: 'onCellClicked'
            },
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
    ]
});

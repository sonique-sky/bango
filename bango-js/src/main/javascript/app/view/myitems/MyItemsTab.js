Ext.define('Spm.view.myitems.MyItemsTab', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.myItems',

    requires: [
        'Ext.button.Button',
        'Ext.grid.column.Widget',
        'Ext.grid.feature.Grouping',
        'Ext.toolbar.Paging',
        'Spm.view.myitems.MyItemsTabViewController',
        'Spm.view.myitems.MyItemsTabViewModel'
    ],

    controller: 'myItems',
    viewModel: {type: 'myItems'},

    title: 'My Items',
    iconCls: 'icon-my-items',
    itemId: 'myItems',

    bind: {
        store: '{myItems}'
    },

    listeners: {
        cellclick: 'onCellClicked',
        added: 'loadMyItems'
    },

    dockedItems: [
        {
            xtype: 'pagingtoolbar',
            border: 0,
            bind: {
                store: '{myItems}'
            },
            listeners: {
                change: 'refreshMyItems'
            }
        }
    ],
    columns: {
        defaults: {
            menuDisabled: true,
            sortable: false,
            hideable: false,
            draggable: false,
            groupable: false
        }
        ,
        items: [
            {
                xtype: 'widgetcolumn',
                width: 40,
                onWidgetAttach: 'onToggleHoldWidgetAttach',
                widget: {
                    xtype: 'button',
                    height: 25,
                    handler: 'onToggleHoldServiceProblem'
                }
            },
            {
                xtype: 'widgetcolumn',
                width: 40,
                widget: {
                    xtype: 'button',
                    height: 25,
                    iconCls: 'icon-work-reminder',
                    handler: 'onSetWorkReminder'
                }
            },
            {
                text: 'Service Problem',
                columns: [
                    {text: 'Service Problem Id', dataIndex: 'serviceProblemId', groupable: false},
                    {text: 'Status', dataIndex: 'status', hidden: true, groupable: true},
                    {
                        text: 'Opened Date',
                        xtype: 'datecolumn',
                        dataIndex: 'openedDate',
                        format: 'd/m/y H:i',
                        groupable: false
                    },
                    {text: 'Queue', dataIndex: 'queue', renderer: 'queueNameRenderer', width: 150},
                    {text: 'Problem Description', dataIndex: 'problem', groupable: false, width: 250}
                ]
            },
            {
                text: 'Work Item',
                columns: [
                    {text: 'Agent', dataIndex: 'workItem.agent', renderer: 'agentNameRenderer'},
                    {text: 'Action', dataIndex: 'workItem.action', renderer: 'workItemActionRenderer', width: 250},
                    {text: 'Created', dataIndex: 'workItem.createdDate', renderer: 'formattedWorkItemCreatedDate'},
                    {text: 'Type', dataIndex: 'workItem.type', renderer: 'workItemTypeRenderer'},
                    {text: 'Status', dataIndex: 'workItem.status', renderer: 'workItemStatusRenderer'}
                ]
            }
        ]
    }
    ,
    features: [
        {ftype: 'grouping', enableNoGroups: false, enableGroupingMenu: false}
    ]

})
;

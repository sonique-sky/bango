Ext.define('Spm.view.myitems.MyItemsTab', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.myItems',

    requires: [
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
            xtype: 'container',
            layout: {type: 'hbox', align: 'stretch'},
            dock: 'top',
            defaults: {
                border: 0
            },
            items: [
                {
                    xtype: 'pagingtoolbar',
                    flex: 1.0,
                    bind: {
                        store: '{myItems}'
                    },
                    listeners: {
                        change : 'refreshMyItems'
                    }
                },
                {
                    xtype: 'tbspacer'
                }
            ]
        }
    ],
    columns: {
        defaults: {
            menuDisabled: true,
            sortable: false,
            hideable: false,
            draggable: false,
            groupable: false
        },
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
                    {text: 'Opened Date', xtype: 'datecolumn', dataIndex: 'openedDate', format: 'd/m/y H:i', groupable: false},
                    {text: 'Queue', xtype: 'templatecolumn', tpl: '{queue.name}'},
                    {text: 'Problem Description', dataIndex: 'problem', groupable: false}
                ]
            },
            {
                text: 'Work Item',
                columns: [
                    {text: 'Agent', xtype: 'templatecolumn', tpl: '{workItem.agent.details.displayName}'},
                    {text: 'Action', xtype: 'templatecolumn', tpl: '{workItem.action.description}'},
                    {text: 'Created', renderer: 'formattedWorkItemCreatedDate'},
                    {text: 'Type', xtype: 'templatecolumn', tpl: '{workItem.assignmentType}'},
                    {text: 'Status', xtype: 'templatecolumn', tpl: '{workItem.status}'}
                ]
            }
        ]
    },
    features: [
        {ftype: 'grouping', enableNoGroups: false, enableGroupingMenu: false}
    ]
});

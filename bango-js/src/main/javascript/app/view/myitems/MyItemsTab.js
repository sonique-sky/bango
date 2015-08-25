Ext.define('Spm.view.myitems.MyItemsTab', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.myItems',

    controller: 'myItems',
    viewModel: {type: 'myItems'},

    title: 'My Items',
    iconCls: 'icon-my-items',

    listeners: {
        added: 'onTabAdded'
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
                    }
                },
                {
                    xtype: 'tbspacer'
                }
            ]
        }
    ],
    items: [
        {
            xtype: 'gridpanel',
            border: 0,
            bind: {
                store: '{myItems}'
            },
            listeners: {
                cellclick: 'onCellClicked'
            },
            columns: [
                {
                    xtype: 'widgetcolumn',
                    width: 40,
                    onWidgetAttach: 'onToggleHoldWidgetAttach',
                    widget: {
                        xtype: 'button',
                        height: 25,
                        handler: 'onToggleHoldServiceProblemFromMyItems'
                    },
                    sortable: false,
                    groupable: false
                },
                {
                    xtype: 'widgetcolumn',
                    width: 40,
                    widget: {
                        xtype: 'button',
                        height: 25,
                        iconCls: 'icon-work-reminder',
                        handler: 'onSetWorkReminder'
                    },
                    sortable: false,
                    groupable: false
                },
                {
                    text: 'Service Problem',
                    columns: [
                        {text: 'Service Problem Id', dataIndex: 'serviceProblemId'},
                        {text: 'Opened Date', xtype: 'datecolumn', dataIndex: 'openedDate', format: 'd/m/y H:i'},
                        {text: 'Queue', xtype: 'templatecolumn', tpl: '{queue.name}'},
                        {text: 'Problem Description', dataIndex: 'problem'}
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
            ],
            features: [{
                ftype: 'grouping'

            }]
        }
    ]
});

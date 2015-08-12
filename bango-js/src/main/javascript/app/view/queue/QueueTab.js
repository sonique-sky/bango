Ext.define('Spm.view.queue.QueueTab', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.queueTab',

    requires: [
        'Spm.view.queue.QueueTabToolbar',
        'Spm.store.ServiceProblems',
        'Ext.grid.Panel',
        'Ext.toolbar.Spacer',
        'Ext.toolbar.Paging'
    ],

    border: 0,

    controller: 'queueTab',
    viewModel: {type: 'queueTab'},
    closable: true,
    iconCls: 'icon-queue',

    bind: {
        title: '{queue.name}'
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
                    xtype: 'queueTabToolbar'
                },
                {
                    xtype: 'pagingtoolbar',
                    flex: 1.0,
                    bind: {
                        store: '{queuedServiceProblems}'
                    }
                }
            ]
        }
    ],
    items: [
        {
            xtype: 'gridpanel',
            reference: 'queueTabGrid',
            bind: {
                store: '{queuedServiceProblems}'
            },
            selModel: {
                selType: 'checkboxmodel',
                checkOnly: true
            },
            border: 0,
            listeners: {
                cellclick: 'onCellClicked',
                selectionchange: 'onSelectionChanged'
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
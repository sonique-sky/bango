Ext.define('Spm.view.queue.QueueTab', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.queueTab',

    requires: [
        'Spm.view.queue.QueueTabToolbar',
        'Spm.view.renderer.NestedPropertyRenderer',
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
                            text: 'Work Item Status',
                            dataIndex: 'workItem.status',
                            renderer: Spm.view.renderer.NestedPropertyRenderer.renderer
                        },
                        {
                            text: 'Agent',
                            dataIndex: 'workItem.agent.displayName',
                            renderer: Spm.view.renderer.NestedPropertyRenderer.renderer
                        }
                    ]
                }
            ]
        }
    ]
});
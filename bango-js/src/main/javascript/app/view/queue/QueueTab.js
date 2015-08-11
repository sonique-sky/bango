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
                cellclick: {fn: this.onCellClicked, scope: this},
                selectionchange: {fn: this.onSelectionChanged, scope: this}
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
    ],

    //constructor: function() {
    //    this.mixins.isActionContext.constructor.call(this);
    //
    //    this.callParent(arguments);
    //},
    //
    //initComponent: function () {
    //    var registeredActions = this.actionContextManager.registerActionsFor(this, [
    //        'Spm.controller.action.queue.BulkClearAction',
    //        'Spm.controller.action.queue.BulkTransferAction'
    //    ]);
    //
    //    this.store = Spm.store.ServiceProblems.queueServiceProblemStore();
    //    this.store.addManagedListener(this.store, 'beforeLoad', this.onBeforeLoad, this);
    //
    //    Ext.applyIf(this, {
    //        title: this.queue.queueName(),
    //        id: 'queue-tab-' + this.queue.queueId(),
    //        dockedItems: [
    //            {
    //                xtype: 'container',
    //                layout: { type: 'hbox', align: 'stretch'},
    //                dock: 'top',
    //                defaults: {
    //                    border: 0
    //                },
    //                items: [
    //                    {
    //                        xtype: 'queueTabToolbar',
    //                        registeredActions: registeredActions
    //                    },
    //                    {
    //                        xtype: 'pagingtoolbar',
    //                        flex: 1.0,
    //                        store: this.store
    //                    }
    //                ]
    //            }
    //        ],
    //        items: [
    //            {
    //                xtype: 'gridpanel',
    //                store: this.store,
    //                selModel: {
    //                    selType: 'checkboxmodel',
    //                    checkOnly: true
    //                },
    //                border: 0,
    //                listeners: {
    //                    cellclick: {fn: this.onCellClicked, scope: this},
    //                    selectionchange: {fn: this.onSelectionChanged, scope: this}
    //                },
    //                columns: [
    //                    {text: 'Service Problem',
    //                        columns: [
    //                            {text: 'Service Problem Id', dataIndex: 'serviceProblemId'},
    //                            {text: 'Status', dataIndex: 'status'}
    //                        ]
    //                    },
    //                    {text: 'Work Item',
    //                        columns: [
    //                            {text: 'Work Item Status', dataIndex: 'workItem.status', renderer: Spm.view.renderer.NestedPropertyRenderer.renderer},
    //                            {text: 'Agent', dataIndex: 'workItem.agent.displayName', renderer: Spm.view.renderer.NestedPropertyRenderer.renderer}
    //                        ]
    //                    }
    //                ]
    //            }
    //        ]
    //    });
    //
    //    this.callParent(arguments);
    //},

    onBeforeLoad: function (store, operation) {
        Ext.apply(operation, {params: {queueId: this.queue.queueId()}});
    },

    load: function () {
        this.store.load({params: {queueId: this.queue.queueId()}})
    },

    loadWith: function (rawJsonData) {
        this.store.loadRawData(rawJsonData);
    },

    onCellClicked: function (view, td, cellIndex, record) {
        if (cellIndex > 0) {
            this.fireEvent('serviceProblemClicked', record);
        }
    },

    onSelectionChanged: function () {
        this.fireEvent('gridSelectionChanged', this)
    },

    selectedServiceProblems: function () {
        return this.down('gridpanel').getSelectionModel().getSelection();
    }
});
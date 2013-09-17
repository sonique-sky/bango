Ext.define('Spm.view.queue.QueueTabContent', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.queueTabContent',

    requires: [
        'Spm.view.renderer.NestedPropertyRenderer',
        'Spm.store.ServiceProblems',
        'Ext.grid.Panel',
        'Ext.toolbar.Spacer',
        'Ext.toolbar.Paging'
    ],

    config: {
        queue: undefined
    },

    border: 0,

    closable: true,
    iconCls: 'icon-queue',

    actionContext: true,
    actionKey: function() {
        return this.queue.queueId();
    },

    initComponent: function () {
        this.store = Spm.store.ServiceProblems.queueServiceProblemStore();
        this.store.addManagedListener(this.store, 'refresh', this.onStoreRefreshed, this);
        this.store.addManagedListener(this.store, 'beforeLoad', this.onBeforeLoad, this);

        Ext.applyIf(this, {
            title: this.queue.queueName(),
            id: 'queue-tab-' + this.queue.queueId(),
            dockedItems: [
                {
                    xtype: 'container',
                    layout: { type: 'hbox', align: 'stretch'},
                    dock: 'top',
                    defaults: {
                        border: 0
                    },
                    items: [
                        {
                            xtype: 'queueTabToolbar',
                            registeredActions: this.registeredActions
                        },
                        {
                            xtype: 'pagingtoolbar',
                            flex: 1.0,
                            store: this.store
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
                    store: this.store,
                    selModel: {
                        selType: 'checkboxmodel',
                        checkOnly: true
                    },
                    border: 0,
                    listeners: {
                        select: {fn: this.onRowSelected, scope: this},
                        deselect: {fn: this.onRowDeselected, scope: this},
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
                                {text: 'Work Item Status', dataIndex: 'workItem.status', renderer: Spm.view.renderer.NestedPropertyRenderer.renderer},
                                {text: 'Agent', dataIndex: 'workItem.agent.displayName', renderer: Spm.view.renderer.NestedPropertyRenderer.renderer}
                            ]
                        }
                    ]
                }
            ]
        });

        this.callParent(arguments);
    },

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

    onRowSelected: function () {
        this.setBulkButtonsDisabled(false);
    },

    onStoreRefreshed: function () {
        this.setBulkButtonsDisabled(true);
    },

    setBulkButtonsDisabled: function (disabled) {
        this.registeredActions.getByKey('bulk-transfer').setDisabled(disabled);
        this.registeredActions.getByKey('bulk-clear').setDisabled(disabled);
    },

    onRowDeselected: function () {
        if (!this.selectedServiceProblems().length) {
            this.setBulkButtonsDisabled(true);
        }
    },

    selectedServiceProblems: function () {
        return this.down('gridpanel').getSelectionModel().getSelection();
    }
});
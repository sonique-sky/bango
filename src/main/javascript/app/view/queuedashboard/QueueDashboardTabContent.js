Ext.define('Spm.view.queuedashboard.QueueDashboardTabContent', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.queueDashboard',

    title: 'Queue Dashboard',
    iconCls: 'icon-queue-dashboard',
    requires: [
        'Spm.view.queuedashboard.ActionToolbar',
        'Spm.controller.action.queuedashboard.RefreshDashboardAction',
        'Spm.view.renderer.NestedPropertyRenderer',
        'Spm.store.QueueDashboardEntries',
        'Ext.grid.Panel',
        'Ext.toolbar.Spacer',
        'Ext.toolbar.Paging'
    ],

    mixins: {
        isActionContext: 'Spm.controller.mixins.IsActionContext'
    },

    config: {
        queue: undefined
    },

    border: 0,

    closable: true,

    constructor: function () {
        this.mixins.isActionContext.constructor.call(this);

        this.callParent(arguments);
    },

    initComponent: function () {

        var registeredActions = this.actionContextManager.registerActionsFor(this, [
            'Spm.controller.action.queuedashboard.RefreshDashboardAction'
        ]);

        this.store = Spm.store.QueueDashboardEntries.queueDashboardEntriesStore();
        this.store.addManagedListener(this.store, 'beforeLoad', this.onBeforeLoad, this);

        Ext.applyIf(this, {

            dockedItems: [
                {
                    xtype: 'queueDashboardToolbar',
                    dock: 'top',
                    registeredActions: registeredActions

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

    onSelectionChanged: function () {
        this.fireEvent('gridSelectionChanged', this)
    },

    selectedServiceProblems: function () {
        return this.down('gridpanel').getSelectionModel().getSelection();
    }
})
;
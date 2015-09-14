Ext.define('Spm.view.dashboard.admin.teams.queueassignment.QueueAssignmentDialog', {
    extend: 'Spm.component.StandardDialog',
    alias: 'widget.queueAssignment',

    requires: [
        'Spm.view.dashboard.admin.teams.queueassignment.QueueAssignmentDialogViewModel'
    ],

    requires: [
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.form.Label',
        'Ext.grid.Panel',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox',
        'Ext.panel.Panel',
        'Spm.view.dashboard.admin.teams.queueassignment.QueueAssignmentDialogViewModel',
        'app.view.dashboard.admin.teams.queueassignment.QueueAssignmentDialogViewController'
    ],

    viewModel: {type: 'queueAssignment'},
    controller: 'queueAssignment',

    listeners: {
        show: 'onShow'
    },

    title: 'Assign Team Queues',
    width: 610,
    height: 240,
    bodyPadding: 5,

    items: [{
        xtype: 'panel',
        cls: 'queue-assignment-view-panel',
        border: false,
        layout: {type: 'hbox', align: 'stretch'},
        padding: '0,15,15,0',
        items: [
            {
                xtype: 'panel',
                layout: {type: 'vbox', align: 'stretch'},
                flex: 1,
                border: 0,
                items: [
                    {
                        xtype: 'label',
                        text: 'Unassigned Queues',
                        cls: 'queue-assignment-label',
                        border: 0
                    },
                    {
                        xtype: 'gridpanel',
                        reference: 'sourceGrid',
                        flex: 1,
                        hideHeaders: true,
                        cls: 'unassigned-queues-view',
                        bind: {
                            store: '{sourceStore}'
                        },
                        columns: [
                            {
                                dataIndex: 'name',
                                scrollable: true,
                                flex: 1
                            }
                        ],
                        selModel: {
                            selType: 'rowmodel',
                            mode: 'MULTI'
                        }
                    }]
            },
            {
                xtype: 'panel',
                layout: {type: 'vbox', vertical: true, align: 'middle'},
                border: false,
                items: [
                    {
                        xtype: 'container',
                        flex: 1
                    },
                    {
                        xtype: 'button',
                        iconCls: 'icon-admin-assign-add-all',
                        tooltip: 'Add all',
                        border: false,
                        handler: 'addAll'
                    },
                    {
                        xtype: 'button',
                        iconCls: 'icon-admin-assign-add',
                        tooltip: 'Add selected',
                        border: false,
                        handler: 'addSelected'
                    },
                    {
                        xtype: 'button',
                        iconCls: 'icon-admin-assign-remove',
                        tooltip: 'Remove selected',
                        border: false,
                        handler: 'removeSelected'
                    },
                    {
                        xtype: 'button',
                        iconCls: 'icon-admin-assign-remove-all',
                        tooltip: 'Remove all',
                        border: false,
                        handler: 'removeAll'
                    },
                    {
                        xtype: 'container',
                        flex: 1
                    }
                ]
            },
            {
                xtype: 'panel',
                layout: {type: 'vbox', align: 'stretch'},
                flex: 1,
                border: 0,
                items: [
                    {
                        xtype: 'label',
                        text: 'Assigned Queues',
                        cls: 'queue-assignment-label',
                        border: 0
                    }, {
                        xtype: 'gridpanel',
                        reference: 'destinationGrid',
                        border: true,
                        hideHeaders: true,
                        cls: 'unassigned-queues-view',
                        flex: 1,
                        bind: {
                            store: '{destinationStore}'
                        },
                        columns: [
                            {
                                dataIndex: 'name',
                                scrollable: true,
                                flex: 1
                            }
                        ],
                        selModel: {
                            selType: 'rowmodel',
                            mode: 'MULTI'
                        }
                    }
                ]
            }]
    }]
});

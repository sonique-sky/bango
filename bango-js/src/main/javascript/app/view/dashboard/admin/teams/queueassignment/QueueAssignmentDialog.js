Ext.define('Spm.view.dashboard.admin.teams.queueassignment.QueueAssignmentDialog', {
    extend: 'Spm.component.StandardDialog',
    alias: 'widget.queueAssignment',

    requires: [
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.form.Label',
        'Ext.grid.Panel',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox',
        'Ext.panel.Panel',
        'Spm.view.dashboard.admin.teams.queueassignment.QueueAssignmentDialogViewController',
        'Spm.view.dashboard.admin.teams.queueassignment.QueueAssignmentDialogViewModel'
    ],

    viewModel: {type: 'queueAssignment'},
    controller: 'queueAssignment',

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
                defaults: {
                    xtype: 'button',
                    border: false
                },
                items: [
                    {xtype: 'container', flex: 1},
                    {
                        iconCls: 'icon-admin-assign-add-all',
                        tooltip: 'Add all',
                        handler: 'addAll'
                    },
                    {
                        iconCls: 'icon-admin-assign-add',
                        tooltip: 'Add selected',
                        handler: 'addSelected'
                    },
                    {
                        iconCls: 'icon-admin-assign-remove',
                        tooltip: 'Remove selected',
                        handler: 'removeSelected'
                    },
                    {
                        iconCls: 'icon-admin-assign-remove-all',
                        tooltip: 'Remove all',
                        handler: 'removeAll'
                    },
                    {xtype: 'container', flex: 1}
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
                            {dataIndex: 'name', scrollable: true, flex: 1}
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

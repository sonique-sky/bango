Ext.define('Spm.view.dashboard.admin.problemcategories.update.assignmentmapping.AssignmentMapping', {
    extend: 'Ext.grid.Panel',

    requires: [
        'Ext.button.Button',
        'Ext.form.field.ComboBox',
        'Ext.grid.column.Action',
        'Ext.grid.plugin.RowEditing',
        'Spm.view.dashboard.admin.problemcategories.update.assignmentmapping.AssignmentMappingViewController',
        'Spm.view.dashboard.admin.problemcategories.update.assignmentmapping.AssignmentMappingViewModel'
    ],

    xtype: 'assignmentMapping',
    reference: 'assignmentMappingTab',

    viewModel: {type: 'assignmentMapping'},
    controller: 'assignmentMapping',

    border: 0,

    bind: {
        store: '{assignmentMappings}'
    },

    tbar: {
        items: [
            {
                xtype: 'button',
                reference: 'newRecordButton',
                text: 'New',
                handler: 'addNewQueueRoutingMapping'
            }
        ]
    },

    columns: {
        defaults: {sortable: false, menuDisabled: true},
        items: [
            {
                text: 'ServiceType',
                dataIndex: 'serviceType',
                renderer: 'serviceTypeNameRenderer',
                flex: 0.5,
                editor: {
                    xtype: 'combobox',
                    displayField: 'displayName',
                    valueField: 'name',
                    bind: {
                        store: '{serviceTypes}'
                    }
                }
            },
            {
                text: 'Routing',
                dataIndex: 'queueId',
                renderer: 'queueNameRenderer',
                flex: 0.5,
                editor: {
                    xtype: 'combobox',
                    displayField: 'name',
                    valueField: 'id',
                    bind: {
                        store: '{queues}'
                    }
                }
            },
            {
                xtype: 'actioncolumn',
                width: 20,
                sortable: false,
                menuDisabled: true,
                items: [{
                    iconCls: 'queue-routing-row-edit',
                    tooltip: 'Edit Routing',
                    handler: 'startEditing'
                }]
            },
            {
                xtype: 'actioncolumn',
                width: 20,
                sortable: false,
                menuDisabled: true,
                items: [{
                    iconCls: 'queue-routing-row-delete',
                    tooltip: 'Delete Routing',
                    handler: 'deleteRouting'
                }]
            }
        ]
    },
    bufferedRenderer: false,
    selType: 'cellmodel',
    plugins: [{
        ptype: 'rowediting',
        pluginId: 'queueRoutingRowEditingPlugin',
        clicksToEdit: 1,
        listeners: {
            beforeedit: 'onBeforeEdit',
            edit: 'updateRouting'
        }
    }]

});

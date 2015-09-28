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
    disableSelection: true,

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
                iconCls: 'icon-admin-problem-category-create',
                handler: 'addQueueRouting'
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
                    allowBlank: false,
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
                    allowBlank: false,
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
                    handler: 'deleteQueueRouting'
                }]
            }
        ]
    },
    bufferedRenderer: false,
    selType: 'cellmodel',
    plugins: [{
        ptype: 'rowediting',
        pluginId: 'queueRoutingRowEditingPlugin',
        clicksToEdit: 0,
        listeners: {
            beforeedit: 'onBeforeEdit',
            edit: 'updateRouting',
            canceledit: 'cancelRouting'
        }
    }]

});

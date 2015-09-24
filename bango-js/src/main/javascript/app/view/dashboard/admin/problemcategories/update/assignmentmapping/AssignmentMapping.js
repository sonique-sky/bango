Ext.define('Spm.view.dashboard.admin.problemcategories.update.assignmentmapping.AssignmentMapping', {
    extend: 'Ext.grid.Panel',

    requires: [
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

    columns: {
        defaults: {sortable: false, menuDisabled: true},
        items: [
            {text: 'ServiceType', dataIndex: 'serviceType', flex: 0.4},
            {
                text: 'Routing',
                dataIndex: 'queueId',
                renderer: 'queueNameRenderer',
                flex: 1,
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
                    iconCls: 'cell-editing-delete-row',
                    tooltip: 'Delete Routing',
                    handler: 'deleteRouting'
                }]
            }
        ]
    },
    selType: 'cellmodel',
    plugins: [{
        ptype: 'rowediting',
        clicksToEdit: 1,
        listeners: {
            beforeedit: 'onBeforeEdit',
            edit: 'updateRouting'
        }
    }]

});

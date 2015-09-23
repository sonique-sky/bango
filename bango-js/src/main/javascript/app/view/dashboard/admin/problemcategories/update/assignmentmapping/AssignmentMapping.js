Ext.define('Spm.view.dashboard.admin.problemcategories.update.assignmentmapping.AssignmentMapping', {
    extend: 'Ext.grid.Panel',

    requires: [
        'Ext.form.field.ComboBox',
        'Ext.grid.column.Widget',
        'Spm.view.dashboard.admin.problemcategories.update.assignmentmapping.AssignmentMappingViewController',
        'Spm.view.dashboard.admin.problemcategories.update.assignmentmapping.AssignmentMappingViewModel'
    ],

    xtype: 'assignmentMapping',

    viewModel: {type: 'assignmentMapping'},
    controller: 'assignmentMapping',

    border: 0,

    bind: {
        store: '{assignmentMappings}'
    },

    columns: {
        defaults: {sortable: false, menuDisabled: true},
        items: [
            {text: 'ServiceType', dataIndex: 'serviceType', flex: 0.6},
            {
                text: 'Routing',
                xtype: 'widgetcolumn',
                dataIndex: 'queue.queueId',
                flex: 1,
                //onWidgetAttach: 'queueComboAttach',
                widget: {
                    xtype: 'combo',
                    displayField: 'name',
                    valueField: 'queueId',
                    bind: {
                        store: '{queues}'
                    }
                }
            }
        ]
    }

})
;

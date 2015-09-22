Ext.define('Spm.view.dashboard.admin.problemcategories.update.assignmentmapping.AssignmentMapping', {
    extend: 'Ext.grid.Panel',

    requires: [
        'Spm.view.dashboard.admin.problemcategories.update.assignmentmapping.AssignmentMappingViewModel',
        'Spm.view.dashboard.admin.problemcategories.update.assignmentmapping.AssignmentMappingViewController'
    ],

    xtype: 'assignmentMapping',

    viewModel: {type: 'assignmentMapping'},
    controller: 'assignmentMapping',

    border: 0,

    bind: {
        store: 'assignmentMapping'
    },

    columns: {
        defaults: {sortable: false, menuDisabled: true},
        items: [
            {text: 'ServiceType', dataIndex: 'serviceType', flex: 0.6},
            {text: 'Routing', dataIndex: 'queue', flex: 1}
        ]
    }

});

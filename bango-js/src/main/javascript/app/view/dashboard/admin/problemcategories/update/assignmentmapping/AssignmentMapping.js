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
    height: 250,

    bind: {
        store: 'assignmentMapping'
    },

    columns: {
        defaults: {sortable: false, menuDisabled: true},
        items: [
            {text: 'ServiceType', flex: 1},
            {text: 'Routing', flex: 1}
        ]
    }

});

Ext.define('Spm.view.dashboard.admin.problemcategories.update.assignmentmapping.AssignmentMappingViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.assignmentMapping',

    stores: {
        assignmentMappings: {
            data: '{problemCategory.queueRouting}',
            filters: [{
                property: 'assignmentCode',
                value: '{assignmentCodeFilter}'
            }]
        }
    }

});

Ext.define('Spm.view.dashboard.admin.problemcategories.update.assignmentmapping.AssignmentMappingViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.assignmentMapping',

    stores: {
        assignmentMappings: {
            type: 'array',
            fields: ['serviceType', 'queue']
        },
        queues: {
            type: 'queues',
            pageSize: 0
        }
    }

});

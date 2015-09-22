Ext.define('Spm.view.dashboard.admin.problemcategories.update.assignmentmapping.AssignmentMappingViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.assignmentMapping',

    stores: {
        assignmentMappings: {
            fields: ['serviceType', 'queue'],
            reader: {
                type: 'json'
            }
        }
    }

});
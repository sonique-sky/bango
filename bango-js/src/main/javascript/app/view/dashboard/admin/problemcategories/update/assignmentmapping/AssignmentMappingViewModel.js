Ext.define('Spm.view.dashboard.admin.problemcategories.update.assignmentmapping.AssignmentMappingViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.assignmentMapping',

    requires: [
        'Spm.model.ServiceType'
    ],

    stores: {
        assignmentMappings: {
            data: '{problemCategory.queueRouting}',
            filters: [{
                property: 'assignmentCode',
                value: '{assignmentCodeFilter}'
            }]
        },
        serviceTypes: {
            model: 'Spm.model.ServiceType',
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: 'api/problemCategory/serviceTypes',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        }
    }

});

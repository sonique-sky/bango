Ext.define('Spm.view.dashboard.admin.problemcategories.update.assignmentmapping.AssignmentMappingViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.assignmentMapping',

    stores: {
        assignmentMappings: {
            type: 'array',
            fields: ['serviceType', 'queue'],

            //data: [
            //    {serviceType: 'Nvn Data', queue: {id: 33, name: 'Queue 1'}},
            //    {serviceType: 'Nvn Voice', queue: {id: 33, name: 'Queue 2'}},
            //    {serviceType: 'FTTC', queue: {id: 33, name: 'Queue 3'}},
            //    {serviceType: 'OnnetBroadband', queue: {id: 33, name: 'Queue 4'}},
            //    {serviceType: 'WLR3', queue: {id: 33, name: 'Queue 5'}}
            //]
        }
    }

})
;

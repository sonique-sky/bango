Ext.define('Spm.view.myitems.MyItemsTabViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.myItems',

    requires: [
        'Spm.model.ServiceProblem'
    ],

    stores: {
        myItems: {
            type: 'serviceProblems',
            groupField: 'status'
        }
    }
});
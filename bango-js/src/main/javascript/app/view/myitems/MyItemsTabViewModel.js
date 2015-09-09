Ext.define('Spm.view.myitems.MyItemsTabViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.myItems',

    stores: {
        myItems: {
            filterOnLoad: false,
            model: 'Spm.model.ServiceProblem',
            sortOnLoad: false,
            groupField: 'status',

            proxy: {
                type: 'ajax',
                url: 'api/agent/myItems',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        }
    }
});
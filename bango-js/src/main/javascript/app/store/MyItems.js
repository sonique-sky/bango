Ext.define('Spm.store.MyItems', {
    extend: 'Ext.data.Store',
    alias: 'store.myItems',

    filterOnLoad: false,
    model: 'Spm.model.ServiceProblem',
    sortOnLoad: false,
    groupField: 'status',

    proxy: {
        type: 'ajax',
        url: 'api/agent/myItems',
        reader: {
            type: 'json',
            rootProperty: 'onePageOfSearchResults',
            totalProperty: 'totalRecordCount'
        }
    }

});
Ext.define('Spm.store.MyItems', {
    extend: 'Ext.data.Store',
    alias: 'store.myItems',

    autoLoad: true,
    filterOnLoad: false,
    model: 'Spm.model.ServiceProblem',
    sortOnLoad: false,

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
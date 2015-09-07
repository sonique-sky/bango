Ext.define('Spm.store.ProblemCategories', {
    extend: 'Ext.data.Store',
    alias: 'store.problemCategories',

    requires: [
        'Spm.model.ProblemCategory'
    ],
    model: 'Spm.model.ProblemCategory',

    sorters: 'problemCode',

    proxy: {
        type: 'rest',
        appendId: false,
        url: 'api/problemCategory',
        reader: {
            type: 'json',
            rootProperty: 'onePageOfSearchResults',
            totalProperty: 'totalRecordCount'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});
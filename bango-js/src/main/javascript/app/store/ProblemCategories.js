Ext.define('Spm.store.ProblemCategories', {
    extend: 'Ext.data.Store',
    alias: 'store.problemCategories',

    requires: [
        'Ext.data.proxy.Rest',
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
            rootProperty: 'data'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});
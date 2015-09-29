Ext.define('Spm.store.StructuredQuestionCodes', {
    extend: 'Ext.data.Store',
    alias: 'store.structuredQuestionCodes',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: 'api/troubleReport/template/structuredQuestionCodes',
        reader: {
            type: 'json',
            rootProperty: 'data',
            transform: function (response) {
                return response.data.map(function (val) {
                    return {code: val};
                });
            }
        }
    }

});
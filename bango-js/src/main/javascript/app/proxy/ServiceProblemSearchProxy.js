Ext.define('Spm.proxy.ServiceProblemSearchProxy', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.serviceProblemSearchProxy',

    model: 'Spm.model.ServiceProblem',

    requires: [
        'Spm.model.ServiceProblem'
    ],

    reader: {
        type: 'json',
        rootProperty: 'onePageOfSearchResults',
        totalProperty: 'totalRecordCount'
    },

    buildUrl: function(request) {
        var params = request.getParams();

        var format = Ext.String.format('api/search/{0}/{1}', params.searchTerm, params.searchParameter);

        delete params.searchTerm;
        delete params.searchParameter;

        return format;
    }
})

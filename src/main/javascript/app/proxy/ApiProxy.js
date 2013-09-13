Ext.define('Spm.proxy.ApiProxy', {
    extend: 'Ext.data.proxy.Ajax',

    singleton: true,

    model: 'Spm.model.ServiceProblem',
    reader: 'json',

    requires: [
        'Spm.util.UrlWithParams',
        'Spm.model.ServiceProblem'
    ],

    buildUrl: function(request) {
        debugger;
        var operation = request.operation;

        return Spm.util.UrlWithParams.format(operation.urlPattern, request.params, operation.parameterNames);
    }
});
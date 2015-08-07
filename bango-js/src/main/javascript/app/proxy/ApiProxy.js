Ext.define('Spm.proxy.ApiProxy', {
    extend: 'Ext.data.proxy.Ajax',
    requires : [
        'Spm.proxy.ApiOperation',
        'Ext.data.operation.Operation'
    ],

    buildUrl: function (request) {
        var operation = request.getOperation();
        var params = request.params;
        delete request.params;  // Stop params from being appended to url

        var urlPattern = operation.urlPattern;
        var parameterNames = operation.parameterNames;

        if (!urlPattern || !parameterNames) {
            throw new Error('Could not find property [urlPattern] or [parameterNames] on Operation!');
        }

        return this.formatUrl(urlPattern, params, parameterNames);
    },

    formatUrl: function (urlPattern, params, paramNames) {
        var parameters = [urlPattern];

        Ext.Array.forEach(paramNames, function (val) {
            parameters.push(params[val]);
        });

        return Ext.String.format.apply(this, parameters);
    }
});
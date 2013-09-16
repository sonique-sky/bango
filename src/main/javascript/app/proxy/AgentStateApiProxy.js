Ext.define('Spm.proxy.AgentStateApiProxy', {
    extend: 'Ext.data.proxy.Ajax',

    singleton: true,

    model: 'Spm.model.AgentState',
    reader: 'json',

    requires: [
        'Spm.model.AgentState'
    ],

    buildUrl: function(request) {
//        debugger;
        var operation = request.operation;
        var params = request.params;
        delete request.params;  // Stop params from being appended to url

        var urlPattern = operation.urlPattern;
        var parameterNames = operation.parameterNames;

        if(!urlPattern || !parameterNames) {
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
Ext.define("Spm.util.UrlWithParams", {

    statics: {
        format: function (urlPattern, params, paramNames) {
            var parameters = [];
            Ext.Array.forEach(paramNames, function (val) {
                parameters.push(params[val]);
                delete params[val];
            });
            return Ext.String.format(urlPattern, parameters);
        }
    }
});
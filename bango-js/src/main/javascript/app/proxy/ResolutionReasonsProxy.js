Ext.define('Spm.proxy.ResolutionReasonsProxy', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.resolutionReasonsProxy',

    buildUrl: function (request) {
        var params = request.getParams();

        if ('read' === request.getAction()) {
            var serviceType = params.serviceType;
            var cause = params.cause;

            delete params.id;
            delete params.serviceType;
            delete params.cause;

            return Ext.String.format('api/resolutionReasons/{0}/{1}', serviceType, cause);
        }
    },

    reader: {
        type: 'json'
    }

});
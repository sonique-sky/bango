Ext.define('Spm.proxy.CausesProxy', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.causesProxy',

    buildUrl: function (request) {
        var params = request.getParams();

        if ('read' === request.getAction()) {
            var serviceType = params.serviceType;
            var fault = params.fault;

            delete params.id;
            delete params.serviceType;
            delete params.fault;

            return Ext.String.format('api/causes/{0}/{1}', serviceType, fault);
        }
    },

    reader: {
        type: 'json'
    }

});
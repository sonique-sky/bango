Ext.define('Spm.proxy.FaultsProxy', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.faultsProxy',

    buildUrl: function (request) {
        var params = request.getParams();

        if ('read' === request.getAction()) {
            var serviceType = params.serviceType;

            delete params.id;
            delete params.serviceType;

            return Ext.String.format('api/faults/{0}', serviceType);
        }
    },

    reader: {
        type: 'json',
        rootProperty: 'data'
    }

});
Ext.define('Spm.proxy.TestProductsProxy', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.testProductsProxy',

    requires: [
        'Ext.data.reader.Json'
    ],

    buildUrl: function (request) {
        var params = request.getParams();

        if ('read' === request.getAction()) {
            var serviceType = params.serviceType;

            delete params.id;
            delete params.serviceType;

            return Ext.String.format('api/troubleReport/template/testProducts/{0}', serviceType);
        }
    },

    reader: {
        type: 'json',
        rootProperty: 'data',
        transform: function (response) {
            return response.data.map(function (val) {
                return {code: val};

            });
        }
    }

});
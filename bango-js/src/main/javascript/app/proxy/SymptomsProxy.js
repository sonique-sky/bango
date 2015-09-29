Ext.define('Spm.proxy.SymptomsProxy', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.symptomsProxy',

    requires: [
        'Ext.data.reader.Json'
    ],

    buildUrl: function (request) {
        var params = request.getParams();

        if ('read' === request.getAction()) {
            var serviceType = params.serviceType;

            delete params.id;
            delete params.serviceType;

            return Ext.String.format('api/troubleReport/template/symptoms/{0}', serviceType);
        }
    },

    reader: {
        type: 'json',
        rootProperty: 'data',
        transform: function (response) {
            return response.data.map(function (val) {
                return {
                    symptomCode: val.symptomCode,
                    description: val.description
                };
            });
        }
    }

});
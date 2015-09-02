Ext.define('Spm.proxy.SymptomsProxy', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.symptomsProxy',

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
        transform: function (data) {
            return data.map(function (val) {
                return {
                    symptomCode: val.symptomCode,
                    description: val.description
                };
            });
        }
    }

});
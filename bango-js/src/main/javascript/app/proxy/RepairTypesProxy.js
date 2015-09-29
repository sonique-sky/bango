Ext.define('Spm.proxy.RepairTypesProxy', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.repairTypesProxy',

    requires: [
        'Ext.data.reader.Json'
    ],

    buildUrl: function (request) {
        var params = request.getParams();
        if ('read' === request.getAction()) {
            var serviceType = params.serviceType;
            delete params.id;
            delete params.serviceType;

            return Ext.String.format('api/troubleReport/repairTypes/{0}', serviceType.code);
        }
    },

    reader: {
        type: 'json',
        rootProperty: 'data',
        transform: function (response) {
            return response.data.map(function (val) {
                return {repairType: val};

            });
        }
    }

});
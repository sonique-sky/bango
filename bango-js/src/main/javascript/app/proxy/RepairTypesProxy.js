Ext.define('Spm.proxy.RepairTypeProxy', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.repairTypesProxy',

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
        transform: function (data) {
            return data.map(function (val) {
                return {repairType: val};

            });
        }
    }

});
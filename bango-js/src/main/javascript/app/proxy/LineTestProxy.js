Ext.define('Spm.proxy.LineTestProxy', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.lineTestProxy',

    requires: [
        'Ext.data.reader.Json'
    ],

    buildUrl: function (request) {
        var params = request.getParams();

        if ('read' === request.getAction()) {
            var serviceId = params.serviceId;

            delete params.id;
            delete params.serviceId;

            return Ext.String.format('api/lineTest/{0}', serviceId);
        }
    },

    reader: {
        type: 'json',
        rootProperty: 'data'
    }

});
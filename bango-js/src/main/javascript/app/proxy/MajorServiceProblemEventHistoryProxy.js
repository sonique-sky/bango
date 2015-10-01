Ext.define('Spm.proxy.MajorServiceProblemEventHistoryProxy', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.majorServiceProblemEventHistoryProxy',

    requires: [
        'Ext.data.reader.Json'
    ],

    buildUrl: function (request) {
        var operation = request.getOperation();

        var params = operation.getParams();
        var entityIdentifier = params.entityIdentifier;

        delete params.entityIdentifier;

        return Ext.String.format('api/msp/{0}/eventHistory', entityIdentifier);
    },

    reader: {
        type: 'json',
        rootProperty: 'data'
    }

});
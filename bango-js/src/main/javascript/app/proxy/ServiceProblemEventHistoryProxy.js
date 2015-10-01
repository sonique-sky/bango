Ext.define('Spm.proxy.ServiceProblemEventHistoryProxy', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.serviceProblemEventHistoryProxy',

    requires: [
        'Ext.data.reader.Json'
    ],

    buildUrl: function (request) {
        var operation = request.getOperation();

        var params = operation.getParams();
        var entityIdentifier = params.entityIdentifier;

        delete params.entityIdentifier;

        return Ext.String.format('api/serviceProblem/{0}/eventHistory', entityIdentifier);
    },

    reader: {
        type: 'json',
        rootProperty: 'data'
    }

});
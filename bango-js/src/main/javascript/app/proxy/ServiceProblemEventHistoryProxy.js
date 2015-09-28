Ext.define('Spm.proxy.ServiceProblemEventHistoryProxy', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.serviceProblemEventHistoryProxy',

    buildUrl: function (request) {
        var operation = request.getOperation();

        var params = operation.getParams();
        var serviceProblemId = params.serviceProblemId;

        delete params.serviceProblemId;

        return Ext.String.format('api/serviceProblem/{0}/eventHistory', serviceProblemId);
    },

    reader: {
        type: 'json',
        rootProperty: 'data'
    }

});
Ext.define('Spm.proxy.ServiceProblemEventHistoryProxy', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.serviceProblemEventHistoryProxy',

    buildUrl: function (request) {
        var operation = request.getOperation();

        var params = operation.getParams();

        return Ext.String.format('api/serviceProblem/{0}/eventHistory', params.serviceProblemId);
    }

});
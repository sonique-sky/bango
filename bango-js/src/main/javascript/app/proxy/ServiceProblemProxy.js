Ext.define('Spm.proxy.ServiceProblemProxy', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.serviceProblemProxy',

    buildUrl: function (request) {
        var params = request.getParams();

        if ('read' === request.getAction()) {
            var id = params.id;

            delete params.id;

            return Ext.String.format('api/serviceProblem/{0}', id);
        }

        if ('pull' === params.serviceProblemAction) {
            var serviceProblemId = request.getRecords()[0].serviceProblemId();
            return Ext.String.format('api/serviceProblem/{0}/pull', serviceProblemId)
        }
    }

});
Ext.define('Spm.proxy.QueuedServiceProblemsProxy', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.queuedServiceProblemsProxy',

    buildUrl: function (request) {
        var operation = request.getOperation();

        var params = operation.getParams();

        return Ext.String.format('api/queue/{0}/serviceProblems', params.queueId);
    }

});
Ext.define('Spm.proxy.AssignedQueuesProxy', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.assignedQueuesProxy',

    buildUrl: function (request) {
        var operation = request.getOperation();

        var params = operation.getParams();

        return Ext.String.format('api/team/{0}/assignedQueues', params.teamId);
    }
});
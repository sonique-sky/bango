Ext.define('Spm.proxy.UnassignedQueuesProxy', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.unassignedQueuesProxy',

    buildUrl: function (request) {
        var operation = request.getOperation();

        var params = operation.getParams();

        return Ext.String.format('api/team/{0}/unassignedQueues', params.teamId);
    }
});
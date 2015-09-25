Ext.define('Spm.proxy.ServiceProblemEventHistoryProxy', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.serviceProblemEventHistoryProxy',
    request: {
        params: undefined
    },
    reader: {
        type: 'json',
        rootProperty: 'data'
    },
    idParam: 'serviceProblemId',
    appendId: true,

    buildUrl: function (request) {
        var operation = request.getOperation();

        var params = operation.getParams();
        var serviceProblemId = (params) ? params.serviceProblemId : serviceProblemId;
        if(params) {
            delete params.serviceProblemId;
        }

        return Ext.String.format('api/eventHistory/{0}', serviceProblemId);
    }
});
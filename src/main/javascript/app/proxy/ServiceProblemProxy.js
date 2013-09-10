Ext.define('Spm.proxy.ServiceProblemProxy', {
    extend: 'Ext.data.proxy.Ajax',

    model: 'Spm.model.ServiceProblem',
    reader: 'json',

    statics: {
        serviceProblemSearchProxy: function () {
            return Ext.create('Spm.proxy.ServiceProblemProxy', {buildUrl: function(request) {return Ext.String.format('api/search/{0}/{1}', request.params.searchType, request.params.searchParameter)}});
        },
        serviceProblemLookupProxy: function() {
            return Ext.create('Spm.proxy.ServiceProblemProxy', {buildUrl: function(request) {return Ext.String.format('api/serviceProblem/{0}', request.params.serviceProblemId)}});
        },
        queueServiceProblemProxy: function() {
            return Ext.create('Spm.proxy.ServiceProblemProxy', {buildUrl: function(request) {return Ext.String.format('api/queue/{0}/serviceProblems', request.params.queueId)}})
        }

    }
});

Ext.define('Spm.proxy.ApiOperation', {
    extend: 'Ext.data.Operation',

    statics: {
        searchOperation: function (params) {
            return Ext.create('Spm.proxy.ApiOperation', {
                        action: 'read',
                        params: params,
                        urlPattern: 'api/search/{0}/{1}',
                        parameterNames: ['searchType', 'searchParameter']
                    }
            );
        },
        serviceProblemLookupOperation: function (params) {
            return Ext.create('Spm.proxy.ApiOperation', {
                        action: 'read',
                        params: params,
                        urlPattern: 'api/serviceProblem/{0}',
                        parameterNames: ['serviceProblemId']
                    }
            );
        },
        queueServiceProblemOperation: function (params) {
            return Ext.create('Spm.proxy.ApiOperation', {
                        action: 'read',
                        params: params,
                        urlPattern: 'api/queue/{0}/serviceProblems',
                        parameterNames: ['queueId']
                    }
            );
        },
        pullServiceProblem: function(params) {
            return Ext.create('Spm.proxy.ApiOperation', {
                        action: 'update',
                        params: params,
                        urlPattern: 'api/serviceProblem/{0}/pull',
                        parameterNames: ['serviceProblemId']
                    }
            );
        }

    }
});
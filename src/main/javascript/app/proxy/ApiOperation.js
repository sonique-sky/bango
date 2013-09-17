Ext.define('Spm.proxy.ApiOperation', {
    extend: 'Ext.data.Operation',

    statics: {
        search: function (options) {
            return Ext.create(Spm.proxy.ApiOperation, Ext.applyIf({
                action: 'read',
                urlPattern: 'api/search/{0}/{1}',
                parameterNames: ['searchType', 'searchParameter']
            }, options));
        },
        myItems: function (options) {
            return Ext.create(Spm.proxy.ApiOperation, Ext.applyIf({
                action: 'read',
                urlPattern: 'api/search/myItems'
            }, options));
        },
        serviceProblem: function (options) {
            return Ext.create(Spm.proxy.ApiOperation, Ext.applyIf({
                action: 'read',
                urlPattern: 'api/serviceProblem/{0}',
                parameterNames: ['serviceProblemId']
            }, options));
        },
        queueServiceProblems: function (options) {
            return Ext.create(Spm.proxy.ApiOperation, Ext.applyIf({
                action: 'read',
                urlPattern: 'api/queue/{0}/serviceProblems',
                parameterNames: ['queueId']
            }, options));
        },
        serviceProblemPull: function (options) {
            return Ext.create(Spm.proxy.ApiOperation, Ext.applyIf({
                action: 'update',
                urlPattern: 'api/serviceProblem/{0}/pull',
                parameterNames: ['serviceProblemId']
            }, options));
        },
        serviceProblemEventHistory: function (options) {
            return Ext.create(Spm.proxy.ApiOperation, Ext.applyIf({
                action: 'read',
                urlPattern: 'api/serviceProblem/{0}/eventHistory',
                parameterNames: ['serviceProblemId']
            }, options));
        },
        workItemHold: function (options) {
            return Ext.create(Spm.proxy.ApiOperation, Ext.applyIf({
                action: 'update',
                urlPattern: 'api/serviceProblem/{0}/hold',
                parameterNames: ['serviceProblemId']
            }, options));
        },
        workItemUnhold: function (options) {
            return Ext.create(Spm.proxy.ApiOperation, Ext.applyIf({
                action: 'update',
                urlPattern: 'api/serviceProblem/{0}/unhold',
                parameterNames: ['serviceProblemId']
            }, options));
        },
        eventHistoryAddNote: function (options) {
            return Ext.create(Spm.proxy.ApiOperation, Ext.applyIf({
                action: 'update',
                urlPattern: 'api/serviceProblem/{0}/eventHistory',
                parameterNames: ['serviceProblemId']
            }, options));
        },
        agentToggleAvailability: function (options) {
            return Ext.create(Spm.proxy.ApiOperation, Ext.applyIf({
                action: 'update',
                urlPattern: 'api/agent/toggleAvailability'
            }, options));
        }
    },

    parameterNames: []

});
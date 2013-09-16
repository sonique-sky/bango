Ext.define('Spm.controller.action.serviceproblem.RefreshAction', {
    extend: 'Spm.controller.action.BaseAction',
    alternateClassName: 'Spm.action.RefreshAction',

    statics: {
        ACTION_NAME: 'refresh'
    },

    constructor: function () {
        this.callParent([Ext.apply({}, {
            name: Spm.action.RefreshAction.ACTION_NAME
        })]);
    },

    startAction: function (serviceProblemTab) {
        var operation = Spm.proxy.ApiOperation.serviceProblem({params: {serviceProblemId: serviceProblemTab.getServiceProblem().serviceProblemId()}});

        Spm.proxy.ServiceProblemApiProxy.read(operation, function (operation) {
            if (operation.wasSuccessful()) {
                serviceProblemTab.load(operation.getRecords()[0]);
            }
        }, this);
    }
});


Ext.define('Spm.controller.action.serviceproblem.UnholdWorkItemAction', {
    extend: 'Spm.controller.action.BaseAction',
    alternateClassName: 'Spm.action.UnholdWorkItemAction',

    statics: {
        ACTION_NAME: 'unhold'
    },

    constructor: function () {
        this.callParent([Ext.apply({}, {
            name: Spm.action.UnholdWorkItemAction.ACTION_NAME
        })]);
    },

    startAction: function (serviceProblemTab) {
        var operation = Spm.proxy.ApiOperation.workItemUnhold({params: {serviceProblemId: serviceProblemTab.getServiceProblem().serviceProblemId()}});

        Spm.proxy.ServiceProblemApiProxy.read(operation, function (operation) {
            if (operation.wasSuccessful()) {
                serviceProblemTab.load(operation.getRecords()[0]);
                serviceProblemTab.fireEvent('workItemUnheld', serviceProblemTab);
            }
        }, this);
    }
});

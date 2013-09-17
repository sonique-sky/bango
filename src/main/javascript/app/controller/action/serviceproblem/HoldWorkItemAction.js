Ext.define('Spm.controller.action.serviceproblem.HoldWorkItemAction', {
    extend: 'Spm.controller.action.BaseAction',
    alternateClassName: 'Spm.action.HoldWorkItemAction',

    statics: {
        ACTION_NAME: 'hold'
    },

    constructor: function () {
        this.callParent([Ext.apply({}, {
            name: Spm.action.HoldWorkItemAction.ACTION_NAME,
            tooltip: 'Hold this work item',
            iconCls: 'icon-hold',
            disabled: true
        })]);
    },

    startAction: function (serviceProblemTab) {
        var operation = Spm.proxy.ApiOperation.workItemHold({params: {serviceProblemId: serviceProblemTab.getServiceProblem().serviceProblemId()}});

        Spm.proxy.ServiceProblemApiProxy.read(operation, function (operation) {
            if (operation.wasSuccessful()) {
                serviceProblemTab.load(operation.getRecords()[0]);
                serviceProblemTab.fireEvent('workItemHeld', serviceProblemTab);
            }
        }, this);
    }
});

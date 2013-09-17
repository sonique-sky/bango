Ext.define('Spm.controller.action.serviceproblem.HoldAndReleaseWorkItemAction', {
    extend: 'Spm.controller.action.BaseAction',
    alternateClassName: 'Spm.action.HoldAndReleaseWorkItemAction',

    statics: {
        ACTION_NAME: 'hold-release'
    },

    constructor: function () {
        this.callParent([Ext.apply({}, {
            name: Spm.action.HoldAndReleaseWorkItemAction.ACTION_NAME
        })]);
    },

    startAction: function (serviceProblemTab) {
        var serviceProblem = serviceProblemTab.getServiceProblem();
        var operation = undefined;
        var eventName = undefined;

        if (serviceProblem.workItem().isHeld()) {
            operation = Spm.proxy.ApiOperation.workItemUnhold({params: {serviceProblemId: serviceProblemTab.getServiceProblem().serviceProblemId()}});
            eventName = 'workItemReleased';
        } else {
            operation = Spm.proxy.ApiOperation.workItemHold({params: {serviceProblemId: serviceProblem.serviceProblemId()}});
            eventName = 'workItemHeld';
        }

        Spm.proxy.ServiceProblemApiProxy.read(operation, function (operation) {
            if (operation.wasSuccessful()) {
                serviceProblemTab.load(operation.getRecords()[0]);
                serviceProblemTab.fireEvent(eventName, serviceProblemTab);
            }
        }, this);
    },

    updateState: function (serviceProblemTab, authenticatedAgent) {
        var workItem = serviceProblemTab.getServiceProblem().workItem();

        if (workItem.isAssigned() && workItem.agent().get('code') == authenticatedAgent.get('code')) {
            this.setDisabled(false);
            if (workItem.isHeld()) {
                this.setIconCls('icon-unhold');
            } else {
                this.setIconCls('icon-hold');
            }
        } else {
            this.setIconCls('icon-hold');
            this.setDisabled(true);
        }
    }
});

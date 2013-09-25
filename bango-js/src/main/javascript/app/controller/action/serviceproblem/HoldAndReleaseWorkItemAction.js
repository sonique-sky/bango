Ext.define('Spm.controller.action.serviceproblem.HoldAndReleaseWorkItemAction', {
    extend: 'Spm.controller.action.BaseAction',
    alternateClassName: 'Spm.action.HoldAndReleaseWorkItemAction',

    statics: {
        ACTION_NAME: 'hold-release'
    },

    constructor: function () {
        this.callParent([{
            name: Spm.action.HoldAndReleaseWorkItemAction.ACTION_NAME
        }]);
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

        Spm.proxy.ServiceProblemApiProxy.update(operation, function (operation) {
            if (operation.wasSuccessful()) {
                serviceProblemTab.load(operation.getRecords()[0]);
                serviceProblemTab.fireEvent(eventName, serviceProblemTab);
            }
        }, this);
    },

    updateState: function (serviceProblemTab, authenticatedAgent) {
        var workItem = serviceProblemTab.getServiceProblem().workItem();

        if (workItem.isHeld()) {
            this.setIconCls('icon-release');
            this.setTooltip('Release this Service Problem');
        } else {
            this.setIconCls('icon-hold');
            this.setTooltip('Hold this Service Problem');
        }

        if (workItem.isAssignedTo(authenticatedAgent)) {
            this.enable();
        } else {
            this.disable();
        }
    }
});
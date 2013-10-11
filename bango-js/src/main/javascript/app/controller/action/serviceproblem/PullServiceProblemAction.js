Ext.define('Spm.controller.action.serviceproblem.PullServiceProblemAction', {
    extend: 'Spm.controller.action.BaseAction',
    alternateClassName: 'Spm.action.PullServiceProblemAction',

    statics: {
        ACTION_NAME: 'pull'
    },

    constructor: function () {
        this.callParent([{
            name: Spm.action.PullServiceProblemAction.ACTION_NAME,
            tooltip: 'Pull this item',
            iconCls: 'icon-pull',
            id: Ext.id(this, 'pull-service-problem-')
        }]);
    },

    startAction: function (serviceProblemTab) {
        var me = this;

        Ext.Msg.show({
            title: 'Confirm Assign',
            msg: 'Do you want to assign this Work Item to yourself?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            callback: function (buttonId) {
                if ('yes' == buttonId) {
                    serviceProblemTab.fireEvent('finishAction', me.name, serviceProblemTab)
                }
            }
        });
    },

    finishAction: function (serviceProblemTab) {
        var operation = Spm.proxy.ApiOperation.serviceProblemPull({params: {serviceProblemId: serviceProblemTab.getServiceProblem().serviceProblemId()}})

        Spm.proxy.ServiceProblemApiProxy.update(operation, function (operation) {
            if (operation.wasSuccessful()) {
                serviceProblemTab.load(operation.getRecords()[0]);
                serviceProblemTab.fireEvent('serviceProblemPulled', serviceProblemTab);
            }
        }, this);
    },

    updateState: function(serviceProblemTab, authenticatedAgent) {
        var workItem = serviceProblemTab.getServiceProblem().workItem();
        var hasPrivilege = authenticatedAgent.hasPrivilege('PullServiceProblem');

        this.setDisabled(!hasPrivilege || !workItem.isPullable())
    }
});

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
            iconCls: 'icon-pull'
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

    updateState: function(serviceProblemTab) {
        var workItem = serviceProblemTab.getServiceProblem().workItem();

        this.setDisabled(!workItem.isPullable())
    }
});

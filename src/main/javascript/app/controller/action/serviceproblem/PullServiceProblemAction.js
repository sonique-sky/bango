Ext.define('Spm.controller.action.serviceproblem.PullServiceProblemAction', {
    extend: 'Spm.controller.action.BaseAction',
    alternateClassName: 'Spm.action.PullServiceProblemAction',

    statics: {
        ACTION_NAME: 'pull'
    },

    constructor: function () {
        this.callParent([Ext.apply({}, {
            name: Spm.action.PullServiceProblemAction.ACTION_NAME
        })]);
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
         var proxy = Ext.create('Spm.proxy.ServiceProblemProxy', {
                buildUrl: function (request) {
                    return Spm.util.UrlWithParams.format('api/serviceProblem/{0}/pull', request.params, ['serviceProblemId'])
                }
            }
        );

        var operation = Ext.create('Ext.data.Operation', {
            action: 'update',
            params: {serviceProblemId: serviceProblemTab.getServiceProblem().serviceProblemId()}
        });

        proxy.read(operation, function (operation) {
            if (operation.wasSuccessful()) {
                serviceProblemTab.load(operation.getRecords()[0]);
            }
        }, this);
    }
});

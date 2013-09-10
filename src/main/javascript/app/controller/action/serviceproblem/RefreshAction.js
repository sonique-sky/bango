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
        var proxy = Spm.proxy.ServiceProblemProxy.serviceProblemLookupProxy();
        var operation = Ext.create('Ext.data.Operation', {
            action: 'read',
            params: {serviceProblemId: serviceProblemTab.getServiceProblem().serviceProblemId()}
        });

        proxy.read(operation, function (operation) {
            if (operation.wasSuccessful()) {
               serviceProblemTab.load( operation.getRecords()[0]);
            }
        }, this);
    }

});


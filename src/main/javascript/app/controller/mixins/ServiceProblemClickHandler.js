Ext.define('Spm.controller.mixins.ServiceProblemClickHandler', {

    requires: [
        'Spm.proxy.ServiceProblemProxy'
    ],

    constructor: function () {
        this.proxy = Spm.proxy.ServiceProblemProxy.serviceProblemLookupProxy();
    },

    onServiceProblemClicked: function (serviceProblem) {
        var operation = Ext.create('Ext.data.Operation', {
            action: 'read',
            params: {serviceProblemId: serviceProblem.get('serviceProblemId')}
        });

        this.proxy.read(operation, function (operation) {
            if (operation.wasSuccessful()) {
                this.fireEvent('displayServiceProblem', operation.getRecords()[0]);
            }
        }, this);
    }
});
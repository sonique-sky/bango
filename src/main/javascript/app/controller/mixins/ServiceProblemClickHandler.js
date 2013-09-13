Ext.define('Spm.controller.mixins.ServiceProblemClickHandler', {

    requires: [
        'Spm.proxy.ApiProxy',
        'Spm.proxy.ApiOperation'
    ],

    onServiceProblemClicked: function (serviceProblem) {
        var operation = Spm.proxy.ApiOperation.serviceProblemLookupOperation({serviceProblemId: serviceProblem.serviceProblemId()});

        Spm.proxy.ApiProxy.proxy.read(operation, function (operation) {
            if (operation.wasSuccessful()) {
                this.fireEvent('displayServiceProblem', operation.getRecords()[0]);
            }
        }, this);
    }
});
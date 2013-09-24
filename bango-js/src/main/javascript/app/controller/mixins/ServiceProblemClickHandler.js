Ext.define('Spm.controller.mixins.ServiceProblemClickHandler', {

    requires: [
        'Spm.proxy.ServiceProblemApiProxy',
        'Spm.proxy.ApiOperation'
    ],

    onServiceProblemClicked: function (serviceProblem) {
        var operation = Spm.proxy.ApiOperation.serviceProblem({params: {serviceProblemId: serviceProblem.serviceProblemId()}});

        Spm.proxy.ServiceProblemApiProxy.read(operation, function (operation) {
            if (operation.wasSuccessful()) {
                this.fireEvent('displayServiceProblem', operation.getRecords()[0]);
            }
        }, this);
    }
});
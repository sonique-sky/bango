Ext.define('Spm.view.serviceproblem.clear.ClearServiceProblemDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.clearServiceProblemDialog',

    onShow: function () {
        var serviceType = this.getViewModel().serviceProblem().serviceType();
        this.getStore('faults').load({
            params: {
                serviceType: serviceType.code
            }
        });
    },

    onAccept: function () {
        if (this.lookupReference('clearServiceProblemForm').isValid()) {
            var viewModel = this.getViewModel();
            var me = this.getView();
            Ext.Ajax.request(
                {
                    url: Ext.String.format('api/serviceProblem/{0}/clear', viewModel.serviceProblem().serviceProblemId()),
                    method: 'POST',
                    jsonData: {
                        fault: viewModel.fault(),
                        cause: viewModel.cause(),
                        resolution: viewModel.resolution()
                    },
                    scope: this,
                    success: function () {
                        this.fireEvent('serviceProblemCleared', viewModel.serviceProblem().serviceProblemId());
                        me.close();
                    }
                }
            );
        }
    },

    onFaultSelected: function () {
        var fault = this.getViewModel().fault();
        var serviceType = this.getViewModel().serviceProblem().serviceType();
        this.getStore('causes').load({
            params: {
                serviceType: serviceType.code,
                fault: fault
            }
        });
        this.lookupReference('causeCombo').setDisabled(false);
        this.lookupReference('resolutionReasonCombo').reset();
        this.lookupReference('resolutionReasonCombo').setDisabled(true);
    },

    onCauseSelected: function () {
        var cause = this.getViewModel().cause();
        var serviceType = this.getViewModel().serviceProblem().serviceType();
        this.getStore('resolutionReasons').load({
            params: {
                serviceType: serviceType.code,
                cause: cause
            }
        });
        this.lookupReference('resolutionReasonCombo').setDisabled(false);
    },

    onValidityChange: function (form, isValid) {
        this.lookupReference('acceptButton').setDisabled(!isValid);
    }

});

Ext.define('Spm.view.serviceproblem.clear.ClearServiceProblemDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.clearServiceProblemDialog',

    onShow: function () {
        var serviceType = this.getViewModel().serviceProblem().serviceType();
        this.getStore('faults').load({
            params: {serviceType: serviceType.code}
        });
    },

    onAccept: function () {
        if (this.lookupReference('clearServiceProblemForm').isValid()) {
            var me = this;
            var viewModel = me.getViewModel();
            var serviceProblemId = viewModel.serviceProblem().serviceProblemId();
            Ext.Ajax.request(
                {
                    url: Ext.String.format('api/serviceProblem/{0}/clear', serviceProblemId),
                    method: 'POST',
                    jsonData: {
                        fault: viewModel.fault(),
                        cause: viewModel.cause(),
                        resolution: viewModel.resolution()
                    },
                    scope: me,
                    success: function () {
                        me.fireEvent('serviceProblemCleared', serviceProblemId);
                        me.closeView();
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
        this.lookupReference('resolutionReasonCombo').reset();
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
    },

    onValidityChange: function (form, isValid) {
        this.getViewModel().set('acceptButtonDefaultDisabled', !isValid);
    }

});

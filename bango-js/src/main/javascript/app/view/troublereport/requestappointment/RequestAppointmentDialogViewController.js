Ext.define('Spm.view.troublereport.requestappointment.RequestAppointmentDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.requestAppointmentDialog',

    onAccept: function () {
        debugger;
        var appointmentReference = this.getViewModel().appointmentReference();
        if (appointmentReference !== null) {
            this.fireEvent('updateAppointmentReference', this.getViewModel().get('appointment.reference'));
            this.getView().close();
        }
    },

    onFetchAppointments: function () {
        var serviceProblemId = this.getViewModel().serviceProblemId();
        var repairType = this.getViewModel().repairType();
        var appointmentStartDate = this.getViewModel().appointmentStartDate();

        if (this.lookupReference('requestAppointmentForm').isValid()) {
            //this.getStore('availableAppointments').removeAll(true);
            this.getStore('availableAppointments').load({
                scope: this,
                params: {
                    serviceProblemId: serviceProblemId,
                    repairType: repairType,
                    appointmentStartDate: appointmentStartDate.getTime()
                },
                callback: function (records, operation, success) {
                    if (success) {
                        var grid = this.getView().lookupReference('available-appointment-grid');
                        this.getView().lookupReference('appointment').setActiveItem(grid);
                        //grid.view.refresh();

                    }
                }
            });
        }
    },

    onValidityChange: function (form, isValid) {
        this.lookupReference('acceptButton').setDisabled(!isValid);
    }
});

Ext.define('Spm.view.troublereport.requestappointment.RequestAppointmentDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.requestAppointmentDialog',

    updateGrid: function (store, records, successful) {
       //var gridView = this.getView().lookupReference('available-appointment-grid').view;
       // records.forEach(function(r) {
       //     var row = gridView.getNode(r);
       //     if(row) {
       //         console.log(row);
       //     }
       // })
    },

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

        //this.getStore('availableAppointments').each(function (record, id) {
        //    record.set('pmTimeslotAvailable', true);
        //    record.set('amTimeslotAvailable', true);
        //});


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

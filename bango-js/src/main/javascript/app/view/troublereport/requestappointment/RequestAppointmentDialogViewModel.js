Ext.define('Spm.view.troublereport.requestappointment.RequestAppointmentDialogViewModel', {
    extend: 'Spm.component.StandardDialogViewModel',
    alias: 'viewmodel.requestAppointmentDialog',

    data: {
        acceptButtonText: 'Reserve',

        serviceProblemId: null,
        appointment: {
            type: 'Standard Repair',
            date: new Date(),
            reference: null
        }
    },

    serviceProblemId: function() {
        return this.get('serviceProblemId');
    },

    appointmentReference: function() {
        return this.get('appointment.reference');
    }

});
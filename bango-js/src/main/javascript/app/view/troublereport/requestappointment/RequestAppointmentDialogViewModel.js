Ext.define('Spm.view.troublereport.requestappointment.RequestAppointmentDialogViewModel', {
    extend: 'Spm.component.StandardDialogViewModel',
    alias: 'viewmodel.requestAppointmentDialog',
    stores: {
        availableAppointments: {
            proxy: 'availableAppointmentsProxy',
            model: 'Spm.model.AvailableAppointment',
            autoLoad: false,
            sorters: 'appointmentDate',
            sortOnLoad: true
        }
    },
    data: {
        acceptButtonText: 'Reserve',

        serviceProblemId: null,
        requestAppointment: {
            type: 'Standard Repair',
            date: new Date()
        },
        reservedAppointment: {
            date: null,
            timeSlot: null
        }
    },

    serviceProblemId: function () {
        return this.get('serviceProblemId');
    },

    appointmentReference: function () {
        return this.get('appointmentReference');
    },

    repairType: function () {
        return this.get('requestAppointment.type');
    },

    appointmentStartDate: function () {
        return this.get('requestAppointment.date');
    }

});
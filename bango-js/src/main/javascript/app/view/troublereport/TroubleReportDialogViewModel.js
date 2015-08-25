Ext.define('Spm.view.troublereport.TroubleReportDialogViewModel', {
    extend: 'Spm.component.StandardDialogViewModel',
    alias: 'viewmodel.troubleReportDialog',

    data: {
        troubleReportTemplate: null
    },

    formulas: {
        hasAppointmentReference: {
            bind: {
                bindTo: '{troubleReportTemplate.appointmentReference}'
            },
            get: function(appointmentReference) {
                return appointmentReference !== null && appointmentReference !== '';
            }
        },
        hasTwentyFourHourAccess: {
            bind: {
                bindTo: '{troubleReportTemplate.twentyFourHourAccess}'
            },
            get: function(twentyFourHourAccess) {
                return twentyFourHourAccess;
            }
        },
        isRoiFttc: {
            bind: {
                bindTo: '{troubleReportTemplate.serviceType}'
            },
            get: function(serviceType) {
                return 'RoiFttc' === serviceType;
            }
        },
        canEnterAccessTimes: {
            bind: {
                hasAppointmentReference: '{hasAppointmentReference}',
                hasTwentyFourHourAccess: '{hasTwentyFourHourAccess}'
            },
            get: function(data) {
                return !data.hasAppointmentReference && !data.hasTwentyFourHourAccess;
            }
        }
    }
});
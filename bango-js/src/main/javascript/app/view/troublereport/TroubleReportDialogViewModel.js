Ext.define('Spm.view.troublereport.TroubleReportDialogViewModel', {
    extend: 'Spm.component.StandardDialogViewModel',
    alias: 'viewmodel.troubleReportDialog',

    data: {
        troubleReportTemplate: null
    },

    formulas: {
        hasAppointmentReference: {
            bind: {
                bindTo: '{troubleReportTemplate.appointmentReference}',
                deep: true
            },
            get: function(appointmentReference) {
                return appointmentReference;
            }
        },
        isRoiFttc: {
            bind: {
                bindTo: '{troubleReportTemplate}',
                deep: true
            },
            get: function(troubleReportTemplate) {
                return 'RoiFttc' === troubleReportTemplate.get('serviceType');
            }
        }
    }
});
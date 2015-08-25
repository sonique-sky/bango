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
            get: function (appointmentReference) {
                return appointmentReference !== null && appointmentReference !== '';
            }
        },
        twentyFourHourAccess: {
            bind: {
                bindTo: '{troubleReportTemplate.twentyFourHourAccess}'
            },
            get: function (twentyFourHourAccess) {
                return twentyFourHourAccess;
            },
            set: function (twentyFourHourAccess) {
                this.set('troubleReportTemplate.twentyFourHourAccess', twentyFourHourAccess);
                if (twentyFourHourAccess) {
                    this.set('troubleReportTemplate.earliestAccessDate', null);
                    this.set('troubleReportTemplate.earliestAccessTime', null);
                    this.set('troubleReportTemplate.latestAccessDate', null);
                    this.set('troubleReportTemplate.latestAccessTime', null);
                }
            }
        },
        isRoiFttc: {
            bind: {
                bindTo: '{troubleReportTemplate.serviceType}'
            },
            get: function (serviceType) {
                return 'RoiFttc' === serviceType;
            }
        },
        canRequestDisEngineer: {
            get: function (get) {
                return this.get('authenticatedAgent').hasPrivilege('RequestDisEngineer');
            }
        },
        canEnterAccessTimes: {
            bind: {
                hasAppointmentReference: '{hasAppointmentReference}',
                twentyFourHourAccess: '{twentyFourHourAccess}'
            },
            get: function (data) {
                return !data.hasAppointmentReference && !data.twentyFourHourAccess;
            }
        }
    }
});
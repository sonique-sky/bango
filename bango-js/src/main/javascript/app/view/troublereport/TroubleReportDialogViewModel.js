Ext.define('Spm.view.troublereport.TroubleReportDialogViewModel', {
    extend: 'Spm.component.StandardDialogViewModel',
    alias: 'viewmodel.troubleReportDialog',

    data: {
        troubleReportTemplate: null
    },

    stores: {
        structuredQuestionCodes: {
            type: 'structuredQuestionCodes'
        },
        testProducts: {
            type: 'testProducts'
        },
        symptoms: {
            type: 'symptoms'
        }
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
                    this.set('troubleReportTemplate.latestAccessDate', null);
                }
            }
        },
        earliestAccessDate: {
            bind: {
                bindTo: '{troubleReportTemplate.earliestAccessDate}'
            },
            get: function (earliestAccessDate) {
                return earliestAccessDate;
            },
            set: function (earliestAccessDate) {
                var date = this.get('troubleReportTemplate.earliestAccessDate') || new Date();
                date.setDate(earliestAccessDate.getDate());
                date.setMonth(earliestAccessDate.getMonth());
                date.setYear(earliestAccessDate.getYear());
                this.set("troubleReportTemplate.earliestAccessDate", date);
            }
        },
        earliestAccessTime: {
            bind: {
                bindTo: '{troubleReportTemplate.earliestAccessDate}'
            },
            get: function (earliestAccessDate) {
                return earliestAccessDate;
            },
            set: function (earliestAccessDate) {
                var date = this.get('troubleReportTemplate.earliestAccessDate') || new Date();
                date.setHours(earliestAccessDate.getHours());
                date.setMinutes(earliestAccessDate.getMinutes());
                this.set("troubleReportTemplate.earliestAccessDate", date);
            }
        },
        latestAccessDate: {
            bind: {
                bindTo: '{troubleReportTemplate.latestAccessDate}'
            },
            get: function (latestAccessDate) {
                return latestAccessDate;
            },
            set: function (latestAccessDate) {
                var date = this.get('troubleReportTemplate.latestAccessDate') || new Date();
                date.setDate(latestAccessDate.getDate());
                date.setMonth(latestAccessDate.getMonth());
                date.setYear(latestAccessDate.getYear());
                this.set("troubleReportTemplate.latestAccessDate", date);
            }
        },
        latestAccessTime: {
            bind: {
                bindTo: '{troubleReportTemplate.latestAccessDate}'
            },
            get: function (latestAccessTime) {
                return latestAccessTime;
            },
            set: function (latestAccessTime) {
                var date = this.get('troubleReportTemplate.latestAccessDate') || new Date();
                date.setHours(latestAccessTime.getHours());
                date.setMinutes(latestAccessTime.getMinutes());
                this.set("troubleReportTemplate.latestAccessDate", date);
            }
        },
        canRequestDisEngineer: {
            get: function (get) {
                return this.get('authenticatedAgent').hasPrivilege('RequestDisEngineer');
            }
        }
        ,
        canEnterAccessTimes: {
            bind: {
                hasAppointmentReference: '{hasAppointmentReference}',
                twentyFourHourAccess: '{twentyFourHourAccess}'
            }
            ,
            get: function (data) {
                return !data.hasAppointmentReference && !data.twentyFourHourAccess;
            }
        },
        isFttc: {
            bind: {
                bindTo: '{troubleReportTemplate.serviceType.code}'
            },
            get: function (serviceType) {
                return 'FTTC' === serviceType;
            }
        },
        isNvnVoice: {
            bind: {
                bindTo: '{troubleReportTemplate.serviceType.code}'
            },
            get: function (serviceType) {
                return 'NvnVoice' === serviceType;
            }
        },
        isWlr3: {
            bind: {
                bindTo: '{troubleReportTemplate.serviceType.code}'
            },
            get: function (serviceType) {
                return 'WLR3' === serviceType;
            }
        },
        isRoiFttc: {
            bind: {
                bindTo: '{troubleReportTemplate.serviceType.code}'
            },
            get: function (serviceType) {
                return 'RoiFttc' === serviceType;
            }
        },
        isRoi: {
            bind: {
                bindTo: '{troubleReportTemplate.serviceType.code}'
            },
            get: function (serviceType) {
                return 'RoiOffnetVoice' === serviceType
                    || 'RoiRuralOffnetBroadband' === serviceType || 'RoiUrbanOffnetBroadband' === serviceType
                    || 'RoiFttc' === serviceType;
            }
        },
        isRoiBroadband: {
            bind: {
                bindTo: '{troubleReportTemplate.serviceType.code}'
            },
            get: function (serviceType) {
                return 'RoiRuralOffnetBroadband' === serviceType || 'RoiUrbanOffnetBroadband' === serviceType;
            }
        },
        isWlr3OrRoiService: {
            bind: {
                bindTo: '{troubleReportTemplate.serviceType.code}'
            },
            get: function (serviceType) {
                return 'RoiOffnetVoice' === serviceType
                    || 'RoiRuralOffnetBroadband' === serviceType || 'RoiUrbanOffnetBroadband' === serviceType
                    || 'RoiFttc' === serviceType
                    || 'WLR3' === serviceType;
            }
        },
        isCoopEnabledProduct: {
            bind: {
                bindTo: '{troubleReportTemplate.testProduct}'
            },
            get: function (testProduct) {
                 return 'LL13' === testProduct || 'LL14' === testProduct;
            }
        },
        isDisEnabledProduct: {
            bind: {
                bindTo: '{troubleReportTemplate}',
                deep: true
            },
            get: function (troubleReportTemplate) {
                var serviceType = troubleReportTemplate.get('serviceType');
                var testProduct = troubleReportTemplate.get('testProduct');

                return 'LL1' === testProduct && 'NvnVoice' === serviceType.code;
            }
        },
        isRaise: {
            bind: {
                bindTo: '{troubleReportTemplate}',
                deep: true
            },
            get: function (troubleReportTemplate) {
                return !troubleReportTemplate.get('cancelRequested') && !troubleReportTemplate.get('amendRequested');
            }
        },
        isRaiseOrRoi: {
            bind: {
                bindTo: '{troubleReportTemplate}',
                deep: true
            },
            get: function (troubleReportTemplate) {
                var serviceType = troubleReportTemplate.get('serviceType');
                var isRoi = 'RoiOffnetVoice' === serviceType.code
                    || 'RoiRuralOffnetBroadband' === serviceType.code || 'RoiUrbanOffnetBroadband' === serviceType.code
                    || 'RoiFttc' === serviceType.code;

                var isRaiseMode = !troubleReportTemplate.get('cancelRequested') && !troubleReportTemplate.get('amendRequested');

                return isRaiseMode || isRoi;
            }
        }
    }
});
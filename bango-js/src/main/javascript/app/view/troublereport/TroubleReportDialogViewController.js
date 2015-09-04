Ext.define('Spm.view.troublereport.TroubleReportDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.troubleReportDialog',

    listen: {
        controller: {
            'requestAppointmentDialog': {
                updateAppointmentReference: 'onUpdateAppointmentReference'
            }
        }
    },

    onShow: function () {
        var serviceType = this.getViewModel().get('troubleReportTemplate.serviceType');
        var serviceId = this.getViewModel().get('troubleReportTemplate.serviceId');
        this.getViewModel().getStore('testProducts').load({
            params: {
                serviceType: serviceType.code
            }
        });
        this.getViewModel().getStore('symptoms').load({
            params: {
                serviceType: serviceType.code
            }
        });
        this.getViewModel().getStore('lineTest').load({
            params: {
                serviceId: serviceId
            }
        });
    },

    onUpdateAppointmentReference: function (appointmentReference) {
        this.getViewModel().set('troubleReportTemplate.appointmentReference', appointmentReference);
    },

    onValidityChange: function (form, isValid) {
        this.lookupReference('acceptButton').setDisabled(!isValid);
    },

    onExpand: function () {
        this.getViewModel().getStore('lineTest').reload();
    },

    onAccept: function () {
        var me = this;
        if (this.lookupReference('troubleReportForm').isValid()) {
            this.getViewModel().get('troubleReport').save({
                    failure: function () {
                    },
                    success: function () {
                        me.getView().close();
                    }
                }
            );
        }
    },

    onRequestAppointment: function () {
        Ext.create('Spm.view.troublereport.requestappointment.RequestAppointmentDialog', {
            viewModel: {
                data: {
                    serviceProblemId: this.getViewModel().get('troubleReportTemplate.serviceProblemId'),
                    serviceType: this.getViewModel().get('troubleReportTemplate.serviceType')
                }
            }
        }).show();
    }

});
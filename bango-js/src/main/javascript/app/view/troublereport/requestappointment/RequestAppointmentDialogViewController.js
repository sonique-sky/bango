Ext.define('Spm.view.troublereport.requestappointment.RequestAppointmentDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.requestAppointmentDialog',

    requestRepairTypes: function () {
        this.getStore('repairTypes').load(
            {
                scope: this,
                params: {
                    serviceType: this.getViewModel().get('serviceType')
                }
            })
    },

    onFetchAppointments: function () {
        var serviceProblemId = this.getViewModel().serviceProblemId();
        var repairType = this.getViewModel().repairType();
        var appointmentStartDate = this.getViewModel().appointmentStartDate();

        if (this.lookupReference('requestAppointmentForm').isValid()) {
            this.getStore('availableAppointments').load({
                scope: this,
                params: {
                    serviceProblemId: serviceProblemId,
                    repairType: repairType,
                    appointmentStartDate: appointmentStartDate.getTime()
                },
                callback: function (records, operation, success) {
                    if (success) {
                        this.getView().lookupReference('appointment').setActiveItem('available-appointment-grid');
                    }
                }
            });
        }
    },

    onAccept: function () {
        var me = this;
        var serviceProblemId = this.getViewModel().serviceProblemId();
        var repairType = this.getViewModel().repairType();
        var reservedAppointment = this.getViewModel().get('reservedAppointment');

        if (this.lookupReference('requestAppointmentForm').isValid()) {
            Ext.Ajax.request(
                {
                    url: Ext.String.format('api/troubleReport/appointment/reserve'),
                    method: 'POST',
                    jsonData: {
                        serviceProblemId: serviceProblemId,
                        repairType: repairType,
                        date: reservedAppointment.date,
                        timeSlot: reservedAppointment.timeSlot
                    },
                    success: function (response) {
                        me.fireEvent('updateAppointmentReference', Ext.decode(response.responseText));
                        me.closeView();
                    }
                }
            );
        }
    },

    onValidityChange: function (form, isValid) {
        this.lookupReference('acceptButton').setDisabled(!isValid);
    },

    amAppointmentSelected: function (radioButton, newValue, oldValue) {
        this.setReservedAppointment(oldValue, newValue, radioButton, 'am');
    },

    pmAppointmentSelected: function (radioButton, newValue, oldValue) {
        this.setReservedAppointment(oldValue, newValue, radioButton, 'pm');
    },

    setReservedAppointment: function (oldValue, newValue, radioButton, timeSlot) {
        if (oldValue === false && newValue === true) {
            var reservedAppointment = this.getViewModel().get('reservedAppointment');
            var widgetRecord = radioButton.getWidgetRecord();
            reservedAppointment.date = widgetRecord.get('appointmentDate').getTime();
            reservedAppointment.timeSlot = timeSlot;
        }
    }
});

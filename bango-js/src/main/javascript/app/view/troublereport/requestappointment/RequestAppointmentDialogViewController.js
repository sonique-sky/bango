Ext.define('Spm.view.troublereport.requestappointment.RequestAppointmentDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.requestAppointmentDialog',

    onAccept: function () {
        this.fireEvent('updateAppointmentReference', this.getViewModel().get('appointment.reference'));
        this.getView().close();
    },

    onFetchAppointments: function () {
        if (this.lookupReference('requestAppointmentForm').isValid()) {
            var viewModel = this.getViewModel();
            var me = this;
        }
    },

    onValidityChange: function (form, isValid) {
        this.lookupReference('acceptButton').setDisabled(!isValid);
    }
});

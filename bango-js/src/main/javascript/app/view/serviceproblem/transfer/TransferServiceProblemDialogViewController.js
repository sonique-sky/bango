Ext.define('Spm.view.serviceproblem.transfer.TransferServiceProblemDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.transferServiceProblemDialog',

    onAccept: function () {
        if (this.lookupReference('transferServiceProblemForm').isValid()) {
            var viewModel = this.getViewModel();
            var me = this;
            Ext.Ajax.request(
                {
                    url: Ext.String.format('api/serviceProblem/{0}/workReminder', viewModel.serviceProblemId()),
                    method: 'POST',
                    jsonData: viewModel.reminderTime(),
                    success: function () {
                        me.fireEvent('workReminderCreated', viewModel.serviceProblemId());
                        me.getView().close();
                    }
                }
            );
        }
    },

    onValidityChange: function (form, isValid) {
        this.lookupReference('acceptButton').setDisabled(!isValid);
    }
});

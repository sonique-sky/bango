Ext.define('Spm.view.common.workreminder.WorkReminderDialogViewController', {
    extend: 'Spm.component.StandardDialogViewController',
    alias: 'controller.workReminderDialog',

    initValues: function () {
        var now = new Date();
        var nextHour = Ext.Date.add(now, Ext.Date.HOUR, 1);
        nextHour.setMinutes(0);
        nextHour.setSeconds(0);

        this.getViewModel().set('reminder.time', nextHour);
        this.getViewModel().set('reminder.date', now);
    },

    onAccept: function () {
        if (this.lookupReference('workReminderForm').isValid()) {
            var viewModel = this.getViewModel();
            var me = this;
            Ext.Ajax.request(
                {
                    url: Ext.String.format('api/serviceProblem/{0}/workReminder', viewModel.serviceProblemId()),
                    method: 'POST',
                    jsonData: viewModel.reminderTime(),
                    success: function () {
                        me.fireEvent('workReminderCreated', viewModel.serviceProblemId());
                        me.closeView();
                    }
                }
            );
        }
    },

    onValidityChange: function (form, isValid) {
        this.lookupReference('acceptButton').setDisabled(!isValid);
    }
});

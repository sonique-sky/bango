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
            this.onCreateWorkReminder(viewModel.reminderTime(), viewModel.serviceProblemId());
            this.getView().close();
        }
    },

    onValidityChange: function (form, isValid) {
        this.lookupReference('acceptButton').setDisabled(!isValid);
    },

    onCreateWorkReminder: function (reminder, serviceProblemId) {
        var me = this;
        Ext.Ajax.request(
            {
                url: Ext.String.format('api/serviceProblem/{0}/workReminder', serviceProblemId),
                method: 'POST',
                jsonData: reminder,
                success: function (response) {
                    me.fireEvent('workReminderCreated', serviceProblemId);
                }
            }
        );
    }
});
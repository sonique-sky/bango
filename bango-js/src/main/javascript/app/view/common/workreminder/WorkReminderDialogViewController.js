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
        console.log(this.getViewModel().serviceProblemId());
    },

    onValidityChange: function (form, isValid) {
        this.lookupReference('acceptButton').setDisabled(!isValid);
    }
});
Ext.define('Spm.view.common.workreminder.WorkReminderDialogViewModel', {
    extend: 'Spm.component.StandardDialogViewModel',
    alias: 'viewmodel.workReminderDialog',

    data: {
        serviceProblemId: null,
        reminder: {
            date: null,
            time: null
        }
    },

    formulas: {
        minTimeValue: {
            bind: '{reminder.date}',
            get: function (reminderDate) {
                if (reminderDate < new Date()) {
                    return new Date();
                } else {
                    return null;
                }
            }
        }
    },

    serviceProblemId: function() {
        return this.get('serviceProblemId');
    }
});
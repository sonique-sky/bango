Ext.define('Spm.view.common.workreminder.WorkReminderDialog', {
    extend: 'Spm.component.StandardDialog',
    alias: 'widget.workReminderDialog',

    viewModel: {type: 'workReminderDialog'},
    controller: 'workReminderDialog',

    listeners: {
        show: 'initValues'
    },

    title: 'Create Work Reminder',
    iconCls: 'icon-work-reminder',

    height: 135,
    width: 300,

    items: [
        {
            xtype: 'form',
            bodyPadding: 10,
            listeners: {
                validitychange: 'onValidityChange'
            },
            reference: 'workReminderForm',
            items: [
                {
                    xtype: 'datefield',
                    fieldLabel: 'Reminder Date',
                    bind: {
                        value: '{reminder.date}'
                    },
                    minValue: new Date(),
                    maxValue: Ext.Date.add(new Date(), Ext.Date.DAY, 6),
                    format: 'd/m/Y',
                    formatText: null
                },
                {
                    xtype: 'timefield',
                    fieldLabel: 'Reminder Time',
                    bind: {
                        value: '{reminder.time}',
                        minValue: '{minTimeValue}'
                    },
                    format: 'H:i',
                    formatText: null
                }
            ]
        }]
});

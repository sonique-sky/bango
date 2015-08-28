Ext.define('Spm.view.admindashboard.queues.update.UpdateQueueDialog', {
    extend: 'Spm.component.StandardDialog',
    alias: 'widget.updateQueueDialog',

    controller: 'updateQueueDialog',
    viewModel: 'updateQueueDialog',
    title: 'Edit Queue',

    height: 215,
    width: 430,

    listeners: {
        show: 'onShow'
    },

    items: [{
        xtype: 'fieldcontainer',
        padding: 10,
        items: [
            {
                xtype: 'textfield',
                width: 380,
                labelWidth: 150,
                itemId: 'queueNameField',
                fieldLabel: 'Queue Name:'
            },
            {
                xtype: 'textfield',
                width: 380,
                labelWidth: 150,
                itemId: 'queueSlaHours',
                fieldLabel: 'SLA (Hours):'
            },
            {
                xtype: 'combobox',
                width: 380,
                labelWidth: 150,
                fieldLabel: 'Domain'
            },
            {
                xtype: 'checkbox',
                labelWidth: 250,
                fieldLabel: 'Manual Transfer Allowed:',
                name: 'manualTransferAllowed'
            },
            {
                xtype: 'checkbox',
                labelWidth: 250,
                fieldLabel: 'Default Work Item Created:',
                name: 'defaultWorkItemCreated'
            }
        ]
    }]
});
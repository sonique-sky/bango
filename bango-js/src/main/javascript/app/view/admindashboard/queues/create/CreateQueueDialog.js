Ext.define('Spm.view.admindashboard.queues.create.UpdateQueueDialog', {
    extend: 'Spm.component.StandardDialog',
    alias: 'widget.createQueueDialog',

    controller: 'createQueueDialog',
    viewModel: 'createQueueDialog',
    title: 'Create Queue',

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
                itemId: 'queueName',
                fieldLabel: 'Queue Name:',
                bind: {
                    value: '{queue.name}'
                }
            },
            {
                xtype: 'textfield',
                width: 380,
                labelWidth: 150,
                itemId: 'queueSlaHours',
                fieldLabel: 'SLA (Hours):',
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
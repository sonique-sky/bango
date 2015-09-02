Ext.define('Spm.view.admindashboard.queues.update.UpdateQueueDialog', {
    extend: 'Spm.component.StandardDialog',
    alias: 'widget.updateQueueDialog',

    controller: 'updateQueueDialog',
    viewModel: {type: 'updateQueueDialog'},
    title: 'Edit Queue',

    height: 215,
    width: 430,

    items: [{
        xtype: 'fieldcontainer',
        padding: 10,
        defaults: {
            listeners: {
                specialkey: 'onSpecialKey'
            }
        },
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
                bind: {
                    value: '{queue.pullSla}'
                }
            },
            {
                xtype: 'combobox',
                width: 380,
                labelWidth: 150,
                fieldLabel: 'Domain',
                bind: {
                    store: '{queueDomains}',
                    value: '{queue.domain}'
                },
                valueField: 'name',
                displayField: 'name',
                editable: false,
                emptyText: 'Select a Domain...'
            },
            {
                xtype: 'checkbox',
                labelWidth: 250,
                fieldLabel: 'Manual Transfer Allowed:',
                name: 'manualTransferAllowed',
                bind: {
                    value: '{queue.manualTransferAllowed}'
                }
            },
            {
                xtype: 'checkbox',
                labelWidth: 250,
                fieldLabel: 'Default Work Item Created:',
                name: 'defaultWorkItemCreated',
                bind: {
                    value: '{queue.defaultWorkItemCreated}'
                }
            }
        ]
    }]
});
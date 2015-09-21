Ext.define('Spm.view.dashboard.admin.queues.createorupdate.CreateOrUpdateQueueDialog', {
    extend: 'Spm.component.StandardDialog',
    alias: 'widget.createOrUpdateQueueDialog',

    requires: [
        'Spm.view.dashboard.admin.queues.createorupdate.CreateOrUpdateQueueDialogViewController',
        'Spm.view.dashboard.admin.queues.createorupdate.CreateOrUpdateQueueDialogViewModel'
    ],

    controller: {type: 'createOrUpdateQueueDialog'},
    viewModel: {type: 'createOrUpdateQueueDialog'},

    height: 215,
    width: 430,

    items: [{
        xtype: 'fieldcontainer',
        padding: 10,

        fieldDefaults: {
            msgTarget: 'side'
        },

        defaults: {
            listeners: {
                specialkey: 'submitOnEnter'
            }
        },

        items: [
            {
                xtype: 'textfield',
                width: 380,
                labelWidth: 150,
                itemId: 'queueName',
                fieldLabel: 'Queue Name:',
                allowBlank: false,
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
                vtype: 'numeric',
                allowBlank: false,
                bind: {
                    value: '{queue.pullSla}'
                }
            },
            {
                xtype: 'combobox',
                width: 380,
                labelWidth: 150,
                fieldLabel: 'Domain',
                allowBlank: false,
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

Ext.define('Spm.view.dashboard.admin.agents.create.CreateAgentDialog', {
    extend: 'Spm.component.StandardDialog',
    alias: 'widget.createAgentDialog',

    requires: [
        'Spm.view.dashboard.admin.agents.create.CreateAgentDialogViewController',
        'Spm.view.dashboard.admin.agents.create.CreateAgentDialogViewModel'
    ],

    viewModel: 'createAgentDialog',
    controller: 'createAgentDialog',

    title: 'Create Agent',
    width: 350,
    height: 220,

    items: [
        {
            xtype: 'fieldcontainer',
            padding: 10,
            defaults: {
                xtype: 'textfield',
                labelWidth: 150,
                allowBlank: false
            },
            items: [
                {
                    itemId: 'agentCode',
                    reference: 'userNameTextField',
                    fieldLabel: 'CAUTH Username',
                    bind: {
                        value: '{agentCode}'
                    }
                },
                {
                    itemId: 'firstName',
                    reference: 'firstNameTextField',
                    fieldLabel: 'FirstName',
                    bind: {
                        value: '{firstName}'
                    }
                },
                {
                    itemId: 'lastName',
                    reference: 'lastNameTextField',
                    fieldLabel: 'LastName',
                    bind: {
                        value: '{lastName}'
                    }
                },
                {
                    xtype: 'combobox',
                    reference: 'roleComboBox',
                    fieldLabel: 'Role',
                    valueField: 'name',
                    displayField: 'description',
                    bind: {
                        value: '{role}',
                        store: '{roles}'
                    }
                },
                {
                    xtype: 'combobox',
                    reference: 'teamComboBox',
                    fieldLabel: 'Team',
                    valueField: 'id',
                    displayField: 'name',
                    bind: {
                        value: '{team}',
                        store: '{teams}',
                        disabled: '{!teamRequired}'
                    }
                }
            ]
        }
    ]

});

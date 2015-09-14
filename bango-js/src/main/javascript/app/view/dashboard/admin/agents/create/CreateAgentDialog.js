Ext.define('Spm.view.dashboard.admin.agents.create.CreateAgentDialog', {
    extend: 'Spm.component.StandardDialog',

    requires: [
        'Spm.view.dashboard.admin.agents.CreateAgentDialogViewModel'
    ],

    viewModel: 'createAgent',

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
                    fieldLabel: 'CAUTH Username',
                    bind: {
                        value: '{agent.agent}'
                    }
                },
                {
                    itemId: 'firstName',
                    fieldLabel: 'FirstName',
                    bind: {
                        value: '{agent.details.firstName}'
                    }
                },
                {
                    itemId: 'lastName',
                    fieldLabel: 'LastName',
                    bind: {
                        value: '{agent.details.lastName}'
                    }
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Role',
                    valueField: 'name',
                    displayField: 'description',
                    bind: {
                        value: '{agent.role}',
                        store: '{roles}'
                    }
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Team',
                    valueField: 'id',
                    displayField: 'name',
                    bind: {
                        value: '{agent.team}',
                        store: '{teams}',
                        disabled: '{!teamRequired}'
                    }
                }
            ]
        }]
});
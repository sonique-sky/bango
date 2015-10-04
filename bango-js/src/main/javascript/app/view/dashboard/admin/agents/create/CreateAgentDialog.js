Ext.define('Spm.view.dashboard.admin.agents.create.CreateAgentDialog', {
    extend: 'Spm.component.StandardDialog',
    alias: 'widget.createAgentDialog',

    requires: [
        'Ext.form.FieldContainer',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Text',
        'Spm.view.dashboard.admin.agents.create.CreateAgentDialogViewController',
        'Spm.view.dashboard.admin.agents.create.CreateAgentDialogViewModel'
    ],

    viewModel: {type: 'createAgentDialog'},
    controller: 'createAgentDialog',

    title: 'Create Agent',
    width: 350,
    height: 220,

    items: [
        {
            xtype: 'form',
            //bodyPadding: 10,
            reference: 'createAgentForm',
            listeners: {
                validitychange: 'onValidityChange'
            },
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
                            fieldLabel: 'CAUTH Username'
                        },
                        {
                            itemId: 'firstName',
                            reference: 'firstNameTextField',
                            fieldLabel: 'FirstName'
                        },
                        {
                            itemId: 'lastName',
                            reference: 'lastNameTextField',
                            fieldLabel: 'LastName'
                        },
                        {
                            xtype: 'combobox',
                            reference: 'roleComboBox',
                            fieldLabel: 'Role',
                            valueField: 'name',
                            displayField: 'description',
                            bind: {
                                store: '{roles}'
                            },
                            listeners: {
                                select: 'onRoleSelected'
                            },
                            emptyText: 'Please select a Role...',
                            queryMode: 'local',
                            forceSelection: true,
                            editable: false
                        },
                        {
                            xtype: 'combobox',
                            reference: 'teamComboBox',
                            fieldLabel: 'Team',
                            valueField: 'id',
                            displayField: 'name',
                            bind: {
                                store: '{teams}'
                            },
                            emptyText: 'Please select a Team...'
                        }
                    ]
                }
            ]
        }
    ]

});

Ext.define('Spm.view.dashboard.admin.agents.role.ChangeAgentRoleDialog', {
    extend: 'Spm.component.StandardDialog',
    alias: 'widget.changeAgentRoleDialog',

    requires: [
        'Spm.view.dashboard.admin.agents.role.ChangeAgentRoleDialogViewController',
        'Spm.view.dashboard.admin.agents.role.ChangeAgentRoleDialogViewModel'
    ],

    viewModel: 'changeAgentRoleDialog',
    controller: 'changeAgentRoleDialog',

    bind: {
        title: 'Change Role For {agent.displayName}'
    },
    iconCls: 'icon-admin-agent-change-role',
    defaultFocus: 'roleComboBox',
    width: 400,
    height: 130,

    items: [{
        xtype: 'fieldcontainer',
        padding: 10,

        defaults: {
            listeners: {
                specialkey: 'submitOnEnter'
            }
        },

        items: [
            {
                xtype: 'combobox',
                name: 'Role',
                itemId: 'roleComboBox',
                labelWidth: 120,
                fieldLabel: 'Role',
                valueField: 'name',
                displayField: 'description',
                bind: {
                    value: '{agentRole}',
                    store: '{roles}'
                },
                typeAhead: true
            },
            {
                xtype: 'combobox',
                name: 'Team',
                itemId: 'teamComboBox',
                labelWidth: 120,
                fieldLabel: 'Team',
                valueField: 'id',
                displayField: 'name',
                bind: {
                    value: '{agent.team.id}',
                    store: '{teams}',
                    disabled: '{mayBelongToATeam}'
                },
                typeAhead: true
            }
        ]
    }]

});
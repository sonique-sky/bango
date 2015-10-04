Ext.define('Spm.view.dashboard.admin.agents.AgentAdminTab', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.agentAdminTab',

    requires: [
        'Ext.button.Button',
        'Ext.grid.column.Template',
        'Ext.grid.feature.Grouping',
        'Ext.toolbar.Paging',
        'Ext.toolbar.Spacer',
        'Spm.view.dashboard.admin.agents.AgentAdminTabViewController',
        'Spm.view.dashboard.admin.agents.AgentAdminTabViewModel'
    ],

    viewModel: {type: 'agentAdminTab'},
    controller: 'agentAdminTab',

    listeners: {
        activate: 'loadAgentsStore',
        select: 'onSelectAgent'
    },

    bind: {
        store: '{agents}'
    },

    title: 'Agents',
    iconCls: 'icon-admin-agents',
    border: 0,

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        defaults: {
            xtype: 'button',
            padding: '5,5,5,5',
            border: 0
        },
        items: [
            {
                tooltip: 'Reassign agent to another team',
                iconCls: 'icon-admin-agent-reassign',
                handler: 'reassignAgent',
                bind: {
                    disabled: '{isLoggedInAgent}'
                }
            },
            {
                tooltip: 'Change agent\'s role',
                iconCls: 'icon-admin-agent-change-role',
                handler: 'changeAgentRole',
                bind: {
                    disabled: '{isLoggedInAgent}'
                }
            },
            {
                tooltip: 'Create new agent',
                iconCls: 'icon-admin-agent-create',
                handler: 'createAgent'
            },
            {
                tooltip: 'Delete Agent',
                iconCls: 'icon-admin-agent-delete',
                handler: 'deleteAgent',
                bind: {
                    disabled: '{isLoggedInAgent}'
                }
            },
            " ",
            {
                xtype: 'pagingtoolbar',
                border: 0,
                bind: {
                    store: '{agents}'
                }
            }
        ]
    }],

    columns: {
        defaults: {
            flex: 1
        },
        items: [
            {text: 'Agent', dataIndex: 'code'},
            {text: 'Name', dataIndex: 'displayName'},
            {text: 'Role', dataIndex: 'role', xtype: 'templatecolumn', tpl: '{role.description}'}
        ]
    },

    features: [{
        ftype: 'grouping',
        enableNoGroups: false,
        enableGroupingMenu: false,
        groupHeaderTpl: 'Team: {name} ({children.length:plural("Agent")})'
    }]

});

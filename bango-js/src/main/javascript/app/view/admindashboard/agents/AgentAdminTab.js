Ext.define('Spm.view.admindashboard.agents.AgentAdminTab', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.agentAdminTab',

    require: [
        'Spm.view.admindashboard.agents.AgentAdminTabViewModel'
    ],

    viewModel: 'agentAdminTab',
    controller: 'agentAdminTab',

    listeners: {
        activate: 'loadStore'
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
            padding: '5,5,5,5'
        },
        items: [
            {
                tooltip: 'Reassign agent to another team',
                iconCls: 'icon-admin-agent-reassign',
                handler: 'foo'
            },
            {
                tooltip: 'Change agent\'s role',
                iconCls: 'icon-admin-agent-change-role',
                handler: 'foo'
            },
            {
                tooltip: 'Create new agent',
                iconCls: 'icon-admin-agent-create',
                handler: 'createAgent'
            },
            {
                tooltip: 'Delete Agent',
                iconCls: 'icon-admin-agent-delete',
                handler: 'foo'
            },
            {xtype: 'tbspacer'},
            {
                xtype: 'pagingtoolbar',
                border: 0,
                bind: {
                    store: '{agents}'
                }
            }
        ]
    }],

    columns: [
        {
            text: 'Agent',
            dataIndex: 'code',
            flex: 0.25
        },
        {
            text: 'Name',
            dataIndex: 'displayName',
            flex: 0.25
        },
        {
            text: 'Team',
            dataIndex: 'teamName',
            hidden: true,
            flex: 0.25
        },
        {
            text: 'Role',
            dataIndex: 'roleName',
            flex: 0.25
        }
    ],
    features: [
        {ftype: 'grouping', enableNoGroups: false, enableGroupingMenu: false}
    ]
});
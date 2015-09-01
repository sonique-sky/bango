Ext.define('Spm.view.admindashboard.agents.AgentAdminTab', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.agentAdminTab',

    require: [
        'Spm.view.admindashboard.agents.AgentAdminTabViewModel'
    ],

    viewModel: 'agentAdminTab',
    controller: 'agentAdminTab',

    listeners: {
        activate: 'loadStore'
    },

    title: 'Agents',
    iconCls: 'icon-admin-agents',


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
                handler: 'foo'
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
    items: [
        {
            xtype: 'gridpanel',
            border: 0,
            reference: 'agentGrid',
            bind: {
                store: '{agents}'
            },
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
        }
    ]
});